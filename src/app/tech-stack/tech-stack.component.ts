import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  PLATFORM_ID,
  ViewChild,
  AfterViewInit,
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
export class TechStackComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  isDesktop = false;

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
      id: 'angular',
      name: 'Angular',
      icon: 'angular.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'ngrx',
      name: 'NgRx',
      icon: 'ngrx.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'rxjs',
      name: 'RxJS',
      icon: 'rxjs.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'angular-material',
      name: 'Angular Material',
      icon: 'angular-material.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'threejs',
      name: 'Three.js',
      icon: 'threejs.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'nestjs',
      name: 'Nest.js',
      icon: 'nestjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'tailwind',
      name: 'Tailwind',
      icon: 'tailwind.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'bootstrap',
      name: 'Bootstrap',
      icon: 'bootstrap.svg',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: 'node.svg',
      meta: {
        tab: 'fullstack',
      },
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: 'nextjs.svg',
      meta: {
        tab: 'fullstack',
      },
    },
    {
      id: 'expressjs',
      name: 'Express JS',
      icon: 'expressjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'sequelize',
      name: 'Sequelize',
      icon: 'sequelize.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'mongoose',
      name: 'Mongoose',
      icon: 'mongoose.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: 'redis.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      icon: 'graphql.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'prismaorm',
      name: 'Prisma ORM',
      icon: 'prismaorm.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'socketio',
      name: 'Socket.io',
      icon: 'socketio.svg',
      meta: {
        tab: 'realtime',
      },
    },
    {
      id: 'jwt',
      name: 'JWT',
      icon: 'jwt.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'auth0',
      name: 'Auth0',
      icon: 'auth0.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'passportjs',
      name: 'Passport.js',
      icon: 'passportjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'git',
      name: 'Git',
      icon: 'git.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: 'docker.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      icon: 'kubernetes.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'jenkins',
      name: 'Jenkins',
      icon: 'jenkins.svg',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'cypress',
      name: 'Cypress',
      icon: 'cypress.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'jasmine',
      name: 'Jasmine',
      icon: 'jasmine.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'karma',
      name: 'Karma',
      icon: 'karma.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'mocha',
      name: 'Mocha',
      icon: 'mocha.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'chai',
      name: 'Chai',
      icon: 'chai.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'lighthouseci',
      name: 'Lighthouse CI',
      icon: 'lighthouseci.png',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'clinicjs',
      name: 'Clinic.js',
      icon: 'clinicjs.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'artillery',
      name: 'Artillery',
      icon: 'artillery.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'nestjs',
      name: 'Nest.js',
      icon: 'nestjs.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'typeorm',
      name: 'TypeORM',
      icon: 'typeorm.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      icon: 'graphql.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'websocket',
      name: 'WebSocket',
      icon: 'websocket.svg',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'jest',
      name: 'Jest',
      icon: 'jest.svg',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'react',
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

  get tabCount() {
    return this.tabs.length;
  }

  ngAfterViewInit() {
    if (!this.isBrowser) return;

    this.isDesktop = window.matchMedia('(min-width: 1024px)').matches;
  }

  drop(event: CdkDragDrop<StackItem[]>, tab: StackTab) {
    const tabItems = event.container.data;

    moveItemInArray(tabItems, event.previousIndex, event.currentIndex);

    this.stackItems = [
      ...this.stackItems.filter((item) => item.meta.tab !== tab),
      ...tabItems,
    ];
  }

  selectTab(index: number) {
    this.activeTabIndex = index;
  }

  getItemsForTab(tab: StackTab): StackItem[] {
    return this.stackItems.filter((item) => item.meta.tab === tab);
  }
}
