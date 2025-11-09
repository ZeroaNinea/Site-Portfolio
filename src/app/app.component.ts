import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  ViewChildren,
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

  @ViewChildren('section', { read: ElementRef })
  sections!: ElementRef<HTMLElement>[];

  private observer!: IntersectionObserver;
  private renderer = inject(Renderer2);

  private animationService = inject(AnimationsService);

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => this.createObserver(), 0);
    }
  }

  private createObserver() {
    if (this.sections) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.animationService.animateSection(entry);
          });
        },
        {
          threshold:
            screen.orientation.type === 'landscape-primary' &&
            window.innerHeight < 600
              ? 0.4
              : 0.4,
        }
      );

      this.sections.forEach((section) => {
        this.observer.observe(section.nativeElement);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
