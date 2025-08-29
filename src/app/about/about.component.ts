import {
  afterNextRender,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  PLATFORM_ID,
  Renderer2,
  DOCUMENT,
  ViewChild,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  HostListener,
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
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('about', { static: false }) about!: ElementRef<HTMLElement>;

  // private document = inject(DOCUMENT);
  private observer!: IntersectionObserver;
  // // private about = this.document.querySelector('#about');
  private renderer = inject(Renderer2);

  private animationService = inject(AnimationsService);

  // constructor() {
  //   afterNextRender(() => {
  //     console.log(this.about.nativeElement);

  //     const options =
  //       window.innerWidth > 768
  //         ? {
  //             threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
  //             rootMargin: '0px 0px -100px 0px',
  //           }
  //         : {
  //             threshold: [0, 0.5, 1, 0.25, 0.35, 1],
  //             rootMargin: '0px 0px -20px 0px',
  //           };

  //     if (this.about) {
  //       this.observer = new IntersectionObserver((entries) => {
  //         entries.forEach((entry) =>
  //           this.animationService.aboutAndHtmlAnimate(entry, this.renderer)
  //         );
  //       }, options);

  //       this.observer.observe(this.about.nativeElement);
  //     }
  //   });
  // }

  ngAfterViewInit(): void {
    this.createObserver();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.createObserver();
  }

  private createObserver() {
    if (!this.about) return;

    const options =
      window.innerWidth > 768
        ? {
            threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
            rootMargin: '0px 0px -100px 0px',
          }
        : {
            threshold: [0, 0.25, 0.35, 0.5, 1],
            rootMargin: '0px 0px -20px 0px',
          };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        this.animationService.aboutAndHtmlAnimate(entry, this.renderer)
      );
    }, options);

    this.observer.observe(this.about.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
