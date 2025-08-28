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

  constructor() {
    // afterNextRender(() => {
    const html = this.document.querySelector('html');
    const about = this.document.querySelector('#about');
    const aboutSection = this.document.querySelector('section.about');

    if (about) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.renderer.addClass(html, 'dark-theme');
              this.renderer.removeClass(html, 'light-theme');

              aboutSection?.animate(
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
                }
              );
            } else {
              this.renderer.addClass(html, 'light-theme');
              this.renderer.removeClass(html, 'dark-theme');

              aboutSection?.animate(
                [
                  {
                    transform: 'translateX(-50px)',
                    opacity: 0.5,
                  },
                  {
                    transform: 'translateX(0)',
                    filter: 'blur(0px)',
                    opacity: 1,
                  },
                  {
                    transform: 'translateX(200px)',
                    opacity: 0,
                    filter: 'blur(1px)',
                  },
                ],
                {
                  duration: 1000,
                }
              );
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      this.observer.observe(about);
    }
    // });
  }
}
