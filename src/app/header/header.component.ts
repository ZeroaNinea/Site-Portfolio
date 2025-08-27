import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    RouterModule,
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header.media.component.scss'],
})
export class HeaderComponent {
  menuOpen = false;
  scrolled = false;
  isScrolling = false;

  toggleMenu(section?: string, timeout: number = 0) {
    setTimeout(() => {
      this.menuOpen = !this.menuOpen;
    }, timeout);

    if (section) {
      this.scrollToSection(section);
    }
  }

  scrollToSection(section: string) {
    this.isScrolling = true;
    document
      .querySelector(`#${section}`)
      ?.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
      this.isScrolling = false;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 64;
  }
}
