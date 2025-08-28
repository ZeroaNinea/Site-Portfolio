import { Component, inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
    const html = this.document.querySelector('html');
    const about = this.document.querySelector('#about');

    if (about) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              html?.classList.add('dark-theme');
              html?.classList.remove('light-theme');
            } else {
              html?.classList.remove('dark-theme');
              html?.classList.add('light-theme');
            }
          });
        },
        {
          threshold: 0.5,
        }
      );

      this.observer.observe(about);
    }
  }
}
