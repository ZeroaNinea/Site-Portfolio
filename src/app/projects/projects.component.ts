import {
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
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

  @ViewChild('projects', { static: false })
  projects!: ElementRef<HTMLElement>;

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

  ngAfterViewInit(): void {
    this.createObserver();
  }

  @HostListener('window:resize')
  onResize() {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.createObserver();
  }

  private createObserver() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.projects) {
        const options =
          window.innerWidth > 768
            ? {
                threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
                rootMargin: '0px 0px -100px 0px',
              }
            : window.innerHeight >= 1080
            ? {
                threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
                rootMargin: '0px 0px -100px 0px',
              }
            : {
                threshold: [0, 0.25, 0.35, 0.5, 1],
                rootMargin: '0px 0px -20px 0px',
              };

        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            this.animationService.projectsAndHtmlAnimate(entry, this.renderer);
          });
        }, options);

        this.observer.observe(this.projects.nativeElement);
      }
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
