import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-geometric-shape',
  imports: [MatIconModule, MatButtonModule],
  standalone: true,
  templateUrl: './geometric-shape.component.html',
  styleUrl: './geometric-shape.component.scss',
})
export class GeometricShapeComponent implements OnInit, OnDestroy {
  @Output() toggleCar = new EventEmitter<void>();

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private mesh!: THREE.Mesh;
  private meshes: THREE.Mesh[] = [];
  private animationId: number = 0;
  // private axesHelper!: THREE.AxesHelper;
  private orbit!: OrbitControls;
  private angle = 0;
  private targetRadius = 2;
  private currentRadius = 2;
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
    this.camera.position.set(0, 0, 6); // X, Y, Z.

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      alpha: true,
    });
    this.renderer.setSize(300, 300);

    // this.axesHelper = new THREE.AxesHelper(5); // Adds a 3D axis helper.
    // this.scene.add(this.axesHelper);

    this.orbit = new OrbitControls(
      this.camera,
      this.containerRef.nativeElement
    );
    this.orbit.update();

    // const geometry = new THREE.IcosahedronGeometry(1, 1);
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const geometry = new THREE.TorusGeometry(1, 0.3, 16, 100);

    // const shape = new THREE.Shape();
    // shape.moveTo(0, 0);
    // shape.lineTo(0, 1);
    // shape.lineTo(1, 1);
    // shape.lineTo(1, 0);
    // shape.lineTo(0, 0);

    // const geometry = new THREE.ShapeGeometry(shape);

    const geometries = [
      // new THREE.IcosahedronGeometry(0.5, 1),
      new THREE.BoxGeometry(0.5, 1, 0.5),
      new THREE.BoxGeometry(0.5, 0.5, 1),
      new THREE.BoxGeometry(1, 0.5, 0.5),
      new THREE.BoxGeometry(0.5, 1, 0.5),
      new THREE.BoxGeometry(0.5, 1, 0.5),
      new THREE.BoxGeometry(1, 0.5, 0.5),
      // new THREE.SphereGeometry(0.4, 16, 16),
      // new THREE.ConeGeometry(0.5, 1, 16),
    ];

    geometries.forEach((geometry, i) => {
      const material = new THREE.MeshStandardMaterial({
        // color: new THREE.Color(`hsl(${i * 90}, 70%, 50%)`),
        color: new THREE.Color('#E0F7FA'),
        flatShading: true,
      });

      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.position.x = Math.cos(i * (Math.PI / 2)) * 2;
      this.mesh.position.y = Math.sin(i * (Math.PI / 2)) * 2;

      this.meshes.push(this.mesh);
      this.scene.add(this.mesh);
    });

    // const material = new THREE.MeshStandardMaterial({
    //   color: 0x673ab7,
    //   flatShading: true,
    // });
    // this.mesh = new THREE.Mesh(geometry, material);
    // this.scene.add(this.mesh);

    // const light = new THREE.DirectionalLight(0xffffff, 1);
    // light.position.set(2, 2, 5);
    // this.scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(2, 2, 5);
    this.scene.add(dirLight);

    const hoverLight = new THREE.PointLight(0x2196f3, 2, 20);
    hoverLight.position.set(0, 0, 5);
    this.scene.add(hoverLight);

    (this as any).hoverLight = hoverLight;
  }

  // private animate = (): void => {
  //   this.animationId = requestAnimationFrame(this.animate);

  //   this.mesh.rotation.x += 0.005;
  //   this.mesh.rotation.y += 0.01;

  //   this.renderer.render(this.scene, this.camera);
  // };

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    this.angle += 0.01;

    // Smoothly move radius toward target
    this.currentRadius = THREE.MathUtils.lerp(
      this.currentRadius,
      this.targetRadius,
      0.05
    );

    this.meshes.forEach((mesh, i) => {
      const offset = (i * (Math.PI * 2)) / this.meshes.length;

      mesh.position.x = Math.cos(this.angle + offset) * this.currentRadius;
      mesh.position.y = Math.sin(this.angle + offset) * this.currentRadius;

      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
    });

    this.renderer.render(this.scene, this.camera);
  };

  onHover(state: boolean): void {
    this.hovered = state;
    this.targetRadius = state ? 3 : 2;
    if (this.hovered) {
      this.meshes.forEach((mesh, i) => {
        (mesh.material as THREE.MeshStandardMaterial).color.set(0xc8e6c9);
      });
    } else {
      this.meshes.forEach((mesh, i) => {
        (mesh.material as THREE.MeshStandardMaterial).color.set(0xe0f7fa);
      });
    }
  }
}
