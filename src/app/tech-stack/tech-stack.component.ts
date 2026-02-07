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
      description: '',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'ngrx',
      name: 'NgRx',
      icon: 'ngrx.svg',
      description: 'Provide state management for Angular applications.',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'rxjs',
      name: 'RxJS',
      icon: 'rxjs.svg',
      description: 'A library for reactive programming using Observables (custom data types).',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'angular-material',
      name: 'Angular Material',
      icon: 'angular-material.svg',
      description: 'Provide UI components for Angular applications.',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'threejs',
      name: 'Three.js',
      icon: 'threejs.svg',
      description: 'A JavaScript library for creating and manipulating 3D models, animations, and interactions.',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'tailwind',
      name: 'Tailwind',
      icon: 'tailwind.svg',
      description: 'A utility-first CSS framework for rapid UI development.',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'bootstrap',
      name: 'Bootstrap',
      icon: 'bootstrap.svg',
      description: 'A popular CSS framework for responsive, mobile-first front-end web development.',
      meta: {
        tab: 'frontend',
      },
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      icon: 'node.svg',
      description: 'A JavaScript runtime environment that allows you to run JavaScript on the server-side.',
      meta: {
        tab: 'fullstack',
      },
    },
    {
      id: 'nextjs',
      name: 'Next.js',
      icon: 'nextjs.svg',
      description: 'A React framework for server-rendered applications, providing features like routing, data fetching, and server-side rendering.',
      meta: {
        tab: 'fullstack',
      },
    },
    {
      id: 'expressjs',
      name: 'Express JS',
      icon: 'expressjs.svg',
      description: 'A minimal and flexible Node.js web application framework for building RESTful APIs.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'sequelize',
      name: 'Sequelize',
      icon: 'sequelize.svg',
      description: 'A library for ORM (Object-Relational Mapping) in Node.js, providing a simple way to work with SQL-based databases.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'mongoose',
      name: 'Mongoose',
      icon: 'mongoose.svg',
      description: 'A library for MongoDB, providing a simple way to work with MongoDB in Node.js.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'redis',
      name: 'Redis',
      icon: 'redis.svg',
      description: 'A key-value store for fast, in-memory data storage.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'graphql',
      name: 'GraphQL',
      icon: 'graphql.svg',
      description: 'A query language for APIs and a runtime for executing queries and mutations.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'prismaorm',
      name: 'Prisma ORM',
      icon: 'prismaorm.svg',
      description: 'A library for ORM (Object-Relational Mapping) in Node.js, providing a simple way to work with SQL-based databases.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'socketio',
      name: 'Socket.io',
      icon: 'socketio.svg',
      description: 'A library for real-time, bidirectional communication between clients and servers. Able to limit clients to specific rooms.',
      meta: {
        tab: 'realtime',
      },
    },
    {
      id: 'jwt',
      name: 'JWT',
      icon: 'jwt.svg',
      description: 'A standard for securely transmitting information between parties as JSON objects.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'auth0',
      name: 'Auth0',
      icon: 'auth0.svg',
      description: 'A cloud-based authentication and authorization platform for web and mobile apps.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'passportjs',
      name: 'Passport.js',
      icon: 'passportjs.svg',
      description: 'A library for authentication and authorization in Node.js.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'git',
      name: 'Git',
      icon: 'git.svg',
      description: 'A distributed version control system.',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'docker',
      name: 'Docker',
      icon: 'docker.svg',
      description: 'A containerization platform for building and running applications in isolated environments.',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'kubernetes',
      name: 'Kubernetes',
      icon: 'kubernetes.svg',
      description: 'A container orchestration platform for automating the deployment, scaling, and management of containerized applications.',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'jenkins',
      name: 'Jenkins',
      icon: 'jenkins.svg',
      description: 'An open source automation server for continuous integration and delivery.',
      meta: {
        tab: 'devops',
      },
    },
    {
      id: 'cypress',
      name: 'Cypress',
      icon: 'cypress.svg',
      description: 'A testing framework for end-to-end testing of web applications.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'jasmine',
      name: 'Jasmine',
      icon: 'jasmine.svg',
      description: 'A behavior-driven development framework for testing JavaScript code. Used by default in Angular.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'karma',
      name: 'Karma',
      icon: 'karma.svg',
      description: 'A testing framework for JavaScript, used by default in Angular.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'mocha',
      name: 'Mocha',
      icon: 'mocha.svg',
      description: 'Mocha is a JavaScript test framework for Node.js.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'chai',
      name: 'Chai',
      icon: 'chai.svg',
      description: 'A BDD/TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'lighthouseci',
      name: 'Lighthouse CI',
      icon: 'lighthouseci.png',
      description: 'A tool for generating and publishing Lighthouse reports for your web projects. Optimizes performance, accessibility, and SEO.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'clinicjs',
      name: 'Clinic.js',
      icon: 'clinicjs.svg',
      description: 'An open-source performance profiling tool for Node.js applications.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'artillery',
      name: 'Artillery',
      icon: 'artillery.svg',
      description: 'A universal, modern, powerful & easy-to-use performance testing toolkit.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'nestjs',
      name: 'Nest.js',
      icon: 'nestjs.svg',
      description: 'A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'typeorm',
      name: 'TypeORM',
      icon: 'typeorm.svg',
      description: 'An Object-Relational Mapping (ORM) tool that makes it easy to work with relational databases in Node.js and TypeScript.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'websocket',
      name: 'WebSocket',
      icon: 'websocket.svg',
      description: 'A communication protocol that allows real-time, bidirectional communication between a client and a server.',
      meta: {
        tab: 'backend',
      },
    },
    {
      id: 'jest',
      name: 'Jest',
      icon: 'jest.svg',
      description: 'A delightful JavaScript Testing Framework with a focus on simplicity.',
      meta: {
        tab: 'testing',
      },
    },
    {
      id: 'react',
      name: 'React',
      icon: 'react.svg',
      description: 'A JavaScript library for building user interfaces.',
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
