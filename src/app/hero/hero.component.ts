import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

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
export class HeroComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('home', { static: false }) home!: ElementRef<HTMLElement>;

  scrollToAbout() {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
