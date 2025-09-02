import { Component } from '@angular/core';

// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { ProjectsComponent } from './projects/projects.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    TechStackComponent,
    ProjectsComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portfolio';
}
