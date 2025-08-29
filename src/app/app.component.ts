import {
  Component,
  inject,
  Renderer2,
  DOCUMENT,
  afterEveryRender,
  afterNextRender,
} from '@angular/core';

// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';

import { AnimationsService } from './shared/services/animations/animations.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, AboutComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';

  private document = inject(DOCUMENT);
  private observer!: IntersectionObserver;
  private about = this.document.querySelector('#about');
  private renderer = inject(Renderer2);

  private animationService = inject(AnimationsService);

  constructor() {
    afterNextRender(() => {
      const options =
        window.innerWidth > 768
          ? {
              threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
              rootMargin: '0px 0px -100px 0px',
            }
          : {
              threshold: [0, 0.5, 1, 0.25, 0.35, 1],
              rootMargin: '0px 0px -20px 0px',
            };

      if (this.about) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) =>
            this.animationService.aboutAndHtmlAnimate(entry, this.renderer)
          );
        }, options);

        this.observer.observe(this.about);
      }
    });
  }
}
