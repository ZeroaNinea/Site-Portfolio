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
    this.renderer.setSize(200, 200);

    const textureLoader = new THREE.TextureLoader();
    const projectTexture = textureLoader.load(this.project.image);

    const materials1 = Array(6).fill(
      new THREE.MeshBasicMaterial({ map: projectTexture })
    );
    const cube1 = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materials1);
    this.scene.add(cube1);

    const canvas2d = document.createElement('canvas');
    const ctx = canvas2d.getContext('2d')!;
    canvas2d.width = 256;
    canvas2d.height = 256;
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, 256, 256);
    ctx.fillStyle = '#fff';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.project.name, 128, 128);

    const textTexture = new THREE.CanvasTexture(canvas2d);
    const materials2 = Array(6).fill(
      new THREE.MeshBasicMaterial({
        map: textTexture,
        transparent: true,
        opacity: 0.8,
      })
    );
    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1.05, 1.05, 1.05),
      materials2
    );
    this.scene.add(cube2);

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
