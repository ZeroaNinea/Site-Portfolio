import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';

import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { StackItem } from '../shared/types/stack-item.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tech-stack',
  imports: [
    MatRippleModule,
    MatSidenavModule,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
  ],
  standalone: true,
  templateUrl: './tech-stack.component.html',
  styleUrls: [
    './tech-stack.component.scss',
    './tech-stack.component.media.scss',
  ],
})
export class TechStackComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('techStack', { static: false })
  techStack!: ElementRef<HTMLElement>;

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
    {
      name: 'React',
      icon: 'react.svg',
    },
  ];

  drop(event: CdkDragDrop<StackItem[]>) {
    moveItemInArray(this.stackItems, event.previousIndex, event.currentIndex);
  }
}
