import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as THREE from 'three';

@Component({
  selector: 'app-geometric-shape',
  imports: [MatIconModule, MatButtonModule],
  standalone: true,
  templateUrl: './geometric-shape.component.html',
  styleUrl: './geometric-shape.component.scss',
})
export class GeometricShapeComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;
  private animationId: number = 0;
  private axesHelper!: THREE.AxesHelper;
  hovered = false;

  ngOnInit(): void {
    this.initScene();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  private initScene(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    // this.camera.position.z = 3;
    this.camera.position.set(0, 0, 3); // X, Y, Z.

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
    });
    this.renderer.setSize(300, 300);

    // this.axesHelper = new THREE.AxesHelper(5); // Adds a 3D axis helper.
    // this.scene.add(this.axesHelper);

    // const geometry = new THREE.IcosahedronGeometry(1, 1);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x673ab7,
      flatShading: true,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 5);
    this.scene.add(light);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  };

  onHover(state: boolean): void {
    this.hovered = state;
    if (this.hovered) {
      (this.mesh.material as THREE.MeshStandardMaterial).color.set(0xff4081);
    } else {
      (this.mesh.material as THREE.MeshStandardMaterial).color.set(0x673ab7);
    }
  }
}
