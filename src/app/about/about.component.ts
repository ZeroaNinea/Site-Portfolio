import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  ViewChild,
  ElementRef,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { GeometricShapeComponent } from '../geometric-shape/geometric-shape.component';

@Component({
  selector: 'app-about',
  imports: [GeometricShapeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', './about.component.media.scss'],
  host: { ngSkipHydration: 'true' },
})
export class AboutComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('about', { static: false }) about!: ElementRef<HTMLElement>;

  private document = inject(DOCUMENT);

  showCar = false;

  toggleCar() {
    this.showCar = !this.showCar;

    if (this.showCar) {
      setTimeout(() => {
        this.scrollToCar();
      }, 300);
    } else {
      setTimeout(() => {
        this.scrollToAbout();
      }, 300);
    }
  }

  scrollToCar() {
    this.document
      .querySelector('#car')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  scrollToAbout() {
    this.document
      .querySelector('#about')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
