import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GeometricShapeComponent } from '../geometric-shape/geometric-shape.component';

@Component({
  selector: 'app-about',
  imports: [GeometricShapeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
