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

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x81c784, wireframe: true })
    );
    this.scene.add(cube1);

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0x4fc3f7,
        wireframe: true,
        opacity: 0.5,
        transparent: true,
      })
    );
    this.scene.add(cube2);

    const textureLoader = new THREE.TextureLoader();
    const projectTexture = textureLoader.load(this.project.image);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 1),
      new THREE.MeshBasicMaterial({ map: projectTexture, transparent: true })
    );
    this.scene.add(plane);

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);

      cube1.rotation.x += 0.01;
      cube1.rotation.y += 0.01;

      cube2.rotation.x -= 0.008;
      cube2.rotation.y -= 0.008;

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
