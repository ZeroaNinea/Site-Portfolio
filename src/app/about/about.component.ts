import {
  afterNextRender,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

import { GeometricShapeComponent } from '../geometric-shape/geometric-shape.component';

@Component({
  selector: 'app-about',
  imports: [GeometricShapeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', './about.media.component.scss'],
})
export class AboutComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
}
