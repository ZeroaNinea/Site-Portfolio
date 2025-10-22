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
import { isPlatformBrowser } from '@angular/common';

// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { ProjectsComponent } from './projects/projects.component';
import { ContactsComponent } from './contacts/contacts.component';

import { AnimationsService } from './shared/services/animations/animations.service';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    TechStackComponent,
    ProjectsComponent,
    ContactsComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'portfolio';

  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('about', { static: false, read: ElementRef })
  about!: ElementRef<HTMLElement>;
  @ViewChild('techStack', { static: false, read: ElementRef })
  techStack!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  private animationService = inject(AnimationsService);

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.createObserver(), 0);
    }
  }

  private createObserver() {
    if (this.about?.nativeElement || this.techStack?.nativeElement) {
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
        entries.forEach((entry) => {
          console.log(entry.target.id);
          if (entry.target.id === 'about') {
            this.animationService.aboutAndHtmlAnimate(entry, this.renderer);
          } else if (entry.target.id === 'tech-stack') {
            this.animationService.techStackAndHtmlAnimate(entry, this.renderer);
          }
        });
      }, options);

      this.observer.observe(this.about.nativeElement);
      this.observer.observe(this.techStack.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
