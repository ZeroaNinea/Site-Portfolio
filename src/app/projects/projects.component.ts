import {
  afterNextRender,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { isPlatformBrowser } from '@angular/common';
import { Project } from '../shared/types/project.interface';
import { AnimationsService } from '../shared/services/animations/animations.service';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-projects',
  imports: [ProjectItemComponent, MatRippleModule],
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss', './projects.media.component.scss'],
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('projects', { static: false })
  projects!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private renderer = inject(Renderer2);

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

  constructor() {
    afterNextRender(() => setInterval(() => this.spawnPaw(), 3000));
  }

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
