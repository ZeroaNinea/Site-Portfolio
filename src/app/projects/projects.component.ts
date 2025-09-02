import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { isPlatformBrowser } from '@angular/common';
import { Project } from '../shared/types/project.interface';

@Component({
  selector: 'app-projects',
  imports: [ProjectItemComponent],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

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
}
