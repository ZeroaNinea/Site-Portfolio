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
  private renderer = inject(Renderer2);
  private observer: IntersectionObserver | undefined;
  private html = this.document.querySelector('html');
  private about = this.document.querySelector('#about');
  private aboutSection = this.document.querySelector('section.about');
  private aboutSubtitle = this.document.querySelector(
    '.about .typewriter-limiter .subtitle'
  );

  constructor() {
    if (this.about) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => this.aboutAnimate(entry));
        },
        {
          threshold: 0.5,
        }
      );

      this.observer.observe(this.about);
    }
  }

  aboutAnimate(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting) {
      this.renderer.addClass(this.html, 'dark-theme');
      this.renderer.removeClass(this.html, 'light-theme');

      this.aboutSection?.animate(
        [
          {
            transform: 'translateX(-200px)',
            opacity: 0,
            filter: 'blur(1px)',
          },
          {
            transform: 'translateX(50px)',
            opacity: 0.5,
          },
          {
            transform: 'translateX(0)',
            filter: 'blur(0px)',
            opacity: 1,
          },
        ],
        {
          duration: 1000,
          fill: 'forwards',
        }
      );
    } else {
      this.renderer.addClass(this.html, 'light-theme');
      this.renderer.removeClass(this.html, 'dark-theme');

      this.aboutSection?.animate(
        [
          {
            transform: 'translateX(0)',
            filter: 'blur(1px)',
            opacity: 1,
          },
          {
            transform: 'translateX(200px)',
            opacity: 0,
          },
        ],
        {
          duration: 200,
          fill: 'forwards',
        }
      );
    }
  }
}
