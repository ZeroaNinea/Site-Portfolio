import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  HostListener,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { GeometricShapeComponent } from '../geometric-shape/geometric-shape.component';
import { AnimationsService } from '../shared/services/animations/animations.service';

@Component({
  selector: 'app-about',
  imports: [GeometricShapeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss', './about.media.component.scss'],
  host: { ngSkipHydration: 'true' },
})
export class AboutComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('about', { static: false }) about!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  private animationService = inject(AnimationsService);

  showCar = false;

  toggleCar() {
    console.log('toggleCar');

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
    this.document.querySelector('#car')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAbout() {
    this.document
      .querySelector('#about')
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
