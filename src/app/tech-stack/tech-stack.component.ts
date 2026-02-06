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
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { StackItem } from '../shared/types/stack-item.interface';
import { StackTab } from '../shared/types/stack-tab.alias';

@Component({
  selector: 'app-tech-stack',
  imports: [
    MatRippleModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    CdkDropList,
    CdkDrag,
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

  tabs: { label: string; value: StackTab }[] = [
    { label: 'Frontend', value: 'frontend' },
    { label: 'Backend', value: 'backend' },
    { label: 'Full-stack', value: 'fullstack' },
    { label: 'Real-time', value: 'realtime' },
    { label: 'DevOps', value: 'devops' },
    { label: 'Testing & Quality', value: 'testing' },
  ];

  activeTabIndex = 0;

  stackItems: StackItem[] = [
    {
      name: 'Angular',
      icon: 'angular.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      name: 'NgRx',
      icon: 'ngrx.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      name: 'RxJS',
      icon: 'rxjs.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      name: 'Angular Material',
      icon: 'angular-material.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      name: 'Three.js',
      icon: 'threejs.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      name: 'Nest.js',
      icon: 'nestjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Tailwind',
      icon: 'tailwind.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      name: 'Bootstrap',
      icon: 'bootstrap.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      name: 'Node.js',
      icon: 'node.svg',
      meta: {
        tab: 'fullstack',
      },
    },
    {
      name: 'Next.js',
      icon: 'nextjs.svg',
      meta: {
        tab: 'fullstack',
      },
    },
    {
      name: 'Express JS',
      icon: 'expressjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Sequelize',
      icon: 'sequelize.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Mongoose',
      icon: 'mongoose.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Redis',
      icon: 'redis.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'GraphQL',
      icon: 'graphql.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Prisma ORM',
      icon: 'prismaorm.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Socket.io',
      icon: 'socketio.svg',
      meta: {
        tab: 'realtime',
      },
    },
    {
      name: 'JWT',
      icon: 'jwt.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Auth0',
      icon: 'auth0.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Passport.js',
      icon: 'passportjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Git',
      icon: 'git.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      name: 'Docker',
      icon: 'docker.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      name: 'Kubernetes',
      icon: 'kubernetes.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      name: 'Jenkins',
      icon: 'jenkins.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      name: 'Cypress',
      icon: 'cypress.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Jasmine',
      icon: 'jasmine.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Karma',
      icon: 'karma.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Mocha',
      icon: 'mocha.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Chai',
      icon: 'chai.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Lighthouse CI',
      icon: 'lighthouseci.png',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Clinic.js',
      icon: 'clinicjs.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Artillery',
      icon: 'artillery.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'Nest.js',
      icon: 'nestjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'TypeORM',
      icon: 'typeorm.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'GraphQL',
      icon: 'graphql.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'WebSocket',
      icon: 'websocket.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      name: 'Jest',
      icon: 'jest.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      name: 'React',
      icon: 'react.svg',
      meta: {
        tab: 'frontend',
      },
    },
  ];

  get activeTab() {
    return this.tabs[this.activeTabIndex].value;
  }

  drop(event: CdkDragDrop<StackItem[]>) {
    moveItemInArray(this.stackItems, event.previousIndex, event.currentIndex);
  }

  selectTab(index: number) {
    this.activeTabIndex = index;
  }
}
