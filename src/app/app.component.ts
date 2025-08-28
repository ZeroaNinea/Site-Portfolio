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

  constructor() {
    const html = this.document.querySelector('html');
    const about = this.document.querySelector('#about');

    this.renderer.addClass(html, 'dark-theme');
    this.renderer.removeClass(html, 'light-theme');
  }
}
