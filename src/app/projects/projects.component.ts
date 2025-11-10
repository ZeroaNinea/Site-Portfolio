import {
  afterNextRender,
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';

import { ProjectItemComponent } from '../project-item/project-item.component';
import { Project } from '../shared/types/project.interface';

@Component({
  selector: 'app-projects',
  imports: [ProjectItemComponent, MatRippleModule],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', './projects.component.media.scss'],
})
export class ProjectsComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('projects', { static: false })
  projects!: ElementRef<HTMLElement>;

  private renderer = inject(Renderer2);

  projectList: Project[] = [
    {
      name: 'Real-Time Chat App',
      image: './assets/previews/real-time-chat-app.png',
      link: 'https://github.com/ZeroaNinea/Real-Time-Chat-App',
    },
    {
      name: 'UI Elements',
      image: './assets/previews/ui-elements.png',
      link: 'https://github.com/ZeroaNinea/UI-Elements',
    },
  ];

  constructor() {
    afterNextRender(() => setInterval(() => this.spawnPaw(), 3000));
  }

  spawnPaw() {
    const container =
      this.projects.nativeElement.querySelector('.paw-container');
    const paw = this.renderer.createElement('div');

    const pawPath = Math.random() < 0.5 ? 'paw-green' : 'paw-pink';
    paw.innerHTML = `<img src="./assets/effect-icons/${pawPath}.svg" alt="🐾" width="10%" style="opacity: 0.5" />`;
    this.renderer.addClass(paw, 'paw');

    this.renderer.setStyle(paw, 'left', `${Math.random() * 90}vw`);

    container?.appendChild(paw);

    setTimeout(() => paw.remove(), 6000);
  }
}
