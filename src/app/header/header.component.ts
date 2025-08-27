import { Component } from '@angular/core';
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

  toggleMenu(section?: string, timeout: number = 0) {
    setTimeout(() => {
      this.menuOpen = !this.menuOpen;
    }, timeout);

    if (section) {
      this.scrollToSection(section);
    }
  }

  scrollToSection(section: string) {
    document
      .querySelector(`#${section}`)
      ?.scrollIntoView({ behavior: 'smooth' });
  }
}
