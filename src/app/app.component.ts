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
  private observer: IntersectionObserver | undefined;
  private about = this.document.querySelector('#about');
  private aboutSubtitle = this.document.querySelector('.about h3.subtitle');
  private renderer = inject(Renderer2);

  private aboutHtmlAnimationsService = inject(AnimationsService);

  constructor() {
    afterNextRender(() => {
      if (this.about) {
        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) =>
              this.aboutHtmlAnimationsService.aboutAndHtmlAnimate(
                entry,
                this.renderer
              )
            );
          },
          {
            threshold: 0.5,
          }
        );

        this.observer.observe(this.about);
      }
    });
  }
}
