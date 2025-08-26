import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  scrollToAbout() {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  }
}
