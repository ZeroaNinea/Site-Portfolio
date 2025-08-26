import { Component } from '@angular/core';
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
  scrollToAbout() {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
