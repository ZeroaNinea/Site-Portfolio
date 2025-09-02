import { Component, ElementRef, Input } from '@angular/core';
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

  // --- Random rotation speeds & offsets ---
  private cube1Rot = { x: 0, y: 0 };
  private cube2Rot = { x: 0, y: 0 };
  private planePhase = Math.random() * Math.PI * 2; // Random start for sine wave.
  private planeAmp!: number;
  private planeSpeed!: number;

  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    const canvas = this.host.nativeElement.querySelector(
      'canvas'
    ) as HTMLCanvasElement;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(300, 300);

    // --- Cubes ---
    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x4db6ac,
        wireframe: true,
        opacity: 0.5,
        transparent: true,
      })
    );
    this.scene.add(cube1);

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xf48fb1,
        wireframe: true,
        opacity: 0.5,
        transparent: true,
      })
    );
    this.scene.add(cube2);

    // --- Project image plane ---
    const textureLoader = new THREE.TextureLoader();
    const projectTexture = textureLoader.load(this.project.image);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1),
      new THREE.MeshBasicMaterial({ map: projectTexture, transparent: true })
    );
    this.scene.add(plane);

    // --- Randomize cube speeds ---
    this.cube1Rot.x = Math.random() * 0.02 - 0.01 || 0.01;
    this.cube1Rot.y = Math.random() * 0.02 - 0.01 || 0.01;

    this.cube2Rot.x = Math.random() * 0.02 - 0.01 || -0.008;
    this.cube2Rot.y = Math.random() * 0.02 - 0.01 || -0.008;

    // --- Randomize plane speed ---
    this.planePhase = Math.random() * Math.PI * 2;
    this.planeAmp = 0.1 + Math.random() * 0.1;
    this.planeSpeed = 0.5 + Math.random() * 1.0;

    // --- Animation loop ---
    let clock = new THREE.Clock();

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      // Random cube rotations.
      cube1.rotation.x += this.cube1Rot.x;
      cube1.rotation.y += this.cube1Rot.y;

      cube2.rotation.x += this.cube2Rot.x;
      cube2.rotation.y += this.cube2Rot.y;

      // Slight plane wobble.
      const t = clock.getElapsedTime();
      plane.rotation.x =
        Math.sin(t * this.planeSpeed + this.planePhase) * this.planeAmp;
      plane.rotation.y =
        Math.cos(t * this.planeSpeed + this.planePhase) * this.planeAmp;

      this.renderer.render(this.scene, this.camera);
    };
    animate();

    canvas.addEventListener('click', () => {
      if (this.project.link) {
        window.open(this.project.link, '_blank');
      }
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }
}
