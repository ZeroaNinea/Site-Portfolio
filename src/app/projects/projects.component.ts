import {
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { isPlatformBrowser } from '@angular/common';
import { Project } from '../shared/types/project.interface';
import { AnimationsService } from '../shared/services/animations/animations.service';

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

  @ViewChild('techStack', { static: false })
  techStack!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  private animationService = inject(AnimationsService);

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
