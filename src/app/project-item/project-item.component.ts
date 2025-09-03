import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Project } from '../shared/types/project.interface';

import * as THREE from 'three';

@Component({
  selector: 'app-project-item',
  imports: [],
  standalone: true,
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  @Input() project!: Project;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId: number = 0;

  // Random speeds.
  private cube1Rot = { x: 0, y: 0 };
  private cube2Rot = { x: 0, y: 0 };
  private planePhase = Math.random() * Math.PI * 2;
  private planeAmp!: number;
  private planeSpeed!: number;

  // Refs.
  private host = inject(ElementRef);
  private cube1!: THREE.Mesh;
  private cube2!: THREE.Mesh;
  private plane!: THREE.Mesh;
  private lighting!: HTMLElement;
  private projectName!: HTMLElement;

  // Hover state.
  private isHovered = false;

  ngAfterViewInit() {
    const canvas = this.host.nativeElement.querySelector(
      'canvas'
    ) as HTMLCanvasElement;
    const wrapper = this.host.nativeElement.querySelector('.cube-wrapper');
    this.lighting = wrapper.querySelector(
      '.background-lighting'
    ) as HTMLElement;
    this.projectName = wrapper.querySelector('.project-name') as HTMLElement;

    // Random lighting delay.
    this.lighting.style.animationDelay = `${Math.random() * 5}s`;

    // Three.js setup.
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(300, 300);

    // Cubes.
    this.cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x4db6ac,
        wireframe: true,
        opacity: 0.5,
        transparent: true,
      })
    );
    this.scene.add(this.cube1);

    this.cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xf48fb1,
        wireframe: true,
        opacity: 0.5,
        transparent: true,
      })
    );
    this.scene.add(this.cube2);

    // Plane with project image.
    const textureLoader = new THREE.TextureLoader();
    const projectTexture = textureLoader.load(this.project.image);
    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1),
      new THREE.MeshBasicMaterial({
        map: projectTexture,
        transparent: true,
      })
    );
    this.scene.add(this.plane);

    // Randomize cube speeds.
    this.cube1Rot.x = Math.random() * 0.02 - 0.01 || 0.01;
    this.cube1Rot.y = Math.random() * 0.02 - 0.01 || 0.01;
    this.cube2Rot.x = Math.random() * 0.02 - 0.01 || -0.008;
    this.cube2Rot.y = Math.random() * 0.02 - 0.01 || -0.008;

    // Randomize plane wobble.
    this.planeAmp = 0.1 + Math.random() * 0.1;
    this.planeSpeed = 0.5 + Math.random() * 1.0;

    // Animate.
    let clock = new THREE.Clock();
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      if (this.isHovered) {
        this.cube1.scale.set(
          Math.min(this.cube1.scale.x + 0.015, 1.2),
          Math.min(this.cube1.scale.y + 0.015, 1.2),
          Math.min(this.cube1.scale.z + 0.015, 1.2)
        );
        this.cube2.scale.set(
          Math.min(this.cube2.scale.x + 0.015, 1.2),
          Math.min(this.cube2.scale.y + 0.015, 1.2),
          Math.min(this.cube2.scale.z + 0.015, 1.2)
        );

        this.cube1.rotation.x += 0.01;
        this.cube2.rotation.y -= 0.01;
      } else {
        this.cube1.scale.set(
          Math.max(this.cube1.scale.x - 0.01, 1),
          Math.max(this.cube1.scale.y - 0.01, 1),
          Math.max(this.cube1.scale.z - 0.01, 1)
        );
        this.cube2.scale.set(
          Math.max(this.cube2.scale.x - 0.01, 1),
          Math.max(this.cube2.scale.y - 0.01, 1),
          Math.max(this.cube2.scale.z - 0.01, 1)
        );

        this.cube1.rotation.x += this.cube1Rot.x;
        this.cube1.rotation.y += this.cube1Rot.y;
        this.cube2.rotation.x += this.cube2Rot.x;
        this.cube2.rotation.y += this.cube2Rot.y;
      }

      // Plane wobble.
      const t = clock.getElapsedTime();
      this.plane.rotation.x =
        Math.sin(t * this.planeSpeed + this.planePhase) * this.planeAmp;
      this.plane.rotation.y =
        Math.cos(t * this.planeSpeed + this.planePhase) * this.planeAmp;

      this.renderer.render(this.scene, this.camera);
    };
    animate();

    // Click to open project.
    canvas.addEventListener('click', () => {
      if (this.project.link) window.open(this.project.link, '_blank');
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  onHover(state: boolean) {
    this.isHovered = state;

    if (state) {
      this.lighting.style.animationDelay = '0s';
    }
  }

  onTouch(state: boolean) {
    this.isHovered = state;

    if (state) {
      this.lighting.style.animationDelay = '0s';
      this.lighting.classList.add('touched');
      this.projectName.classList.add('touched');
    } else {
      this.lighting.classList.remove('touched');
      this.projectName.classList.remove('touched');
    }
  }
}
