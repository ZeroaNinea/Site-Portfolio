import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  AfterViewInit,
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';

import { MatRippleModule } from '@angular/material/core';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { AnimationsService } from '../shared/services/animations/animations.service';
import { StackItem } from '../shared/types/stack-item.interface';
@Component({
  selector: 'app-tech-stack',
  imports: [MatRippleModule, CdkDropList, CdkDrag],
  standalone: true,
  templateUrl: './tech-stack.component.html',
  styleUrls: [
    './tech-stack.component.scss',
    './tech-stack.media.component.scss',
  ],
})
export class TechStackComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('techStack', { static: false })
  techStack!: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;
  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  private animationService = inject(AnimationsService);

  stackItems: StackItem[] = [
    {
      name: 'Angular',
      icon: 'angular.svg',
    },
    {
      name: 'NgRx',
      icon: 'ngrx.svg',
    },
    {
      name: 'RxJS',
      icon: 'rxjs.svg',
    },
    {
      name: 'Angular Material',
      icon: 'angular-material.svg',
    },
    {
      name: 'Three.js',
      icon: 'threejs.svg',
    },
    {
      name: 'Node.js',
      icon: 'node.svg',
    },
    {
      name: 'Express JS',
      icon: 'expressjs.svg',
    },
    {
      name: 'Sequelize',
      icon: 'sequelize.svg',
    },
    {
      name: 'Mongoose',
      icon: 'mongoose.svg',
    },
    {
      name: 'Redis',
      icon: 'redis.svg',
    },
    {
      name: 'Socket.io',
      icon: 'socketio.svg',
    },
    {
      name: 'JWT',
      icon: 'jwt.svg',
    },
    {
      name: 'Auth0',
      icon: 'auth0.svg',
    },
    {
      name: 'Passport.js',
      icon: 'passportjs.svg',
    },
    {
      name: 'Git',
      icon: 'git.svg',
    },
    {
      name: 'Docker',
      icon: 'docker.svg',
    },
    {
      name: 'Kubernetes',
      icon: 'kubernetes.svg',
    },
    {
      name: 'Jenkins',
      icon: 'jenkins.svg',
    },
    {
      name: 'Cypress',
      icon: 'cypress.svg',
    },
    {
      name: 'Jasmine',
      icon: 'jasmine.svg',
    },
    {
      name: 'Karma',
      icon: 'karma.svg',
    },
    {
      name: 'Mocha',
      icon: 'mocha.svg',
    },
    {
      name: 'Chai',
      icon: 'chai.svg',
    },
    {
      name: 'Lighthouse CI',
      icon: 'lighthouseci.png',
    },
    {
      name: 'Clinic.js',
      icon: 'clinicjs.svg',
    },
    {
      name: 'Artillery',
      icon: 'artillery.svg',
    },
    {
      name: 'Nest.js',
      icon: 'nestjs.svg',
    },
    {
      name: 'TypeORM',
      icon: 'typeorm.svg',
    },
    {
      name: 'GraphQL',
      icon: 'graphql.svg',
    },
    {
      name: 'WebSocket',
      icon: 'websocket.svg',
    },
    {
      name: 'Jest',
      icon: 'jest.svg',
    },
  ];

  // ngAfterViewInit(): void {
  //   this.createObserver();
  // }

  // @HostListener('window:resize')
  // onResize() {
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  //   this.createObserver();
  // }

  // private createObserver() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     if (this.techStack) {
  //       const options =
  //         window.innerWidth > 768
  //           ? {
  //               threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
  //               rootMargin: '0px 0px -100px 0px',
  //             }
  //           : window.innerHeight >= 1080
  //           ? {
  //               threshold: [0, 0.1, 0.25, 0.35, 0.5, 1],
  //               rootMargin: '0px 0px -100px 0px',
  //             }
  //           : {
  //               threshold: [0, 0.25, 0.35, 0.5, 1],
  //               rootMargin: '0px 0px -20px 0px',
  //             };

  //       this.observer = new IntersectionObserver((entries) => {
  //         entries.forEach((entry) => {
  //           this.animationService.techStackAndHtmlAnimate(entry, this.renderer);
  //         });
  //       }, options);

  //       this.observer.observe(this.techStack.nativeElement);
  //     }
  //   }
  // }

  // ngOnDestroy(): void {
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  // }

  drop(event: CdkDragDrop<StackItem[]>) {
    moveItemInArray(this.stackItems, event.previousIndex, event.currentIndex);
  }
}
