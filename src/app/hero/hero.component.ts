import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AnimationsService } from '../shared/services/animations/animations.service';

@Component({
  selector: 'app-hero',
  imports: [MatIconModule],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrls: [
    './hero.component.scss',
    './hero-triangles.component.scss',
    './hero.media.component.scss',
    './hero-triangles.media.component.scss',
  ],
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('home', { static: false }) home!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  private animationService = inject(AnimationsService);

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
    if (isPlatformBrowser(this.platformId)) {
      if (this.home) {
        const options =
          window.innerWidth > 768
            ? {
                threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
                rootMargin: '0px 0px -100px 0px',
              }
            : window.innerHeight >= 1080
            ? {
                threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
                rootMargin: '0px 0px -100px 0px',
              }
            : {
                threshold: [0, 0.25, 0.35, 0.5, 1],
                rootMargin: '0px 0px -20px 0px',
              };

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            this.animationService.homeAndHtmlAnimate(entry, this.renderer);
          });
        }, options);

        this.observer.observe(this.home.nativeElement);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  scrollToAbout() {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
