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
import { MatRippleModule } from '@angular/material/core';
import { isPlatformBrowser } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { AnimationsService } from '../shared/services/animations/animations.service';

@Component({
  selector: 'app-contacts',
  imports: [MatButtonModule, MatRippleModule],
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.media.component.scss'],
})
export class ContactsComponent {
  @ViewChild('contacts', { static: false })
  contacts!: ElementRef<HTMLElement>;

  // private observer!: IntersectionObserver;
  // private renderer = inject(Renderer2);
  // private document = inject(DOCUMENT);

  // private animationService = inject(AnimationsService);

  // private platformId = inject(PLATFORM_ID);

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
  //     if (this.contacts) {
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
  //           this.animationService.contactsAndHtmlAnimate(entry, this.renderer);
  //         });
  //       }, options);

  //       this.observer.observe(this.contacts.nativeElement);
  //     }
  //   }
  // }

  // ngOnDestroy(): void {
  //   if (this.observer) {
  //     this.observer.disconnect();
  //   }
  // }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
