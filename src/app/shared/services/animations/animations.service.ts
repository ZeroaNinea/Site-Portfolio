import { Injectable, inject, NgZone, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Renderer2 } from '@angular/core';

import { Theme } from '../../types/theme.alias';

@Injectable({ providedIn: 'root' })
export class AnimationsService {
  private document = inject(DOCUMENT);
  private ngZone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private paragraphsAnimation: Keyframe[] = [
    { transform: 'translateX(-100px)', opacity: 0, filter: 'blur(1px)' },
    { transform: 'translateX(20px)', opacity: 0.5 },
    { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
  ];

  private typingInterval: any = null;
  private aboutAnimating = false;
  private techStackAnimating = false;

  private START_THRESHOLD = 0.35;
  private EXIT_THRESHOLD = 0.1;

  private setTheme(renderer: Renderer2, theme: Theme) {
    renderer.removeClass(this.document.documentElement, 'light-theme');
    renderer.removeClass(this.document.documentElement, 'dark-theme');
    renderer.removeClass(this.document.documentElement, 'green-light-theme');

    switch (theme) {
      case 'light':
        renderer.addClass(this.document.documentElement, 'light-theme');
        break;
      case 'dark':
        renderer.addClass(this.document.documentElement, 'dark-theme');
        break;
      case 'green-light':
        renderer.addClass(this.document.documentElement, 'green-light-theme');
        break;
      case 'rose-dark':
        renderer.addClass(this.document.documentElement, 'rose-dark-theme');
        break;
    }
  }

  aboutAndHtmlAnimate(entry: IntersectionObserverEntry, renderer: Renderer2) {
    if (!this.isBrowser) return;

    const base = entry.target as HTMLElement;
    const aboutSection = base.matches?.('section.about')
      ? base
      : base.querySelector('section.about') ?? base;

    if (!aboutSection) return;

    const aboutSubtitle = aboutSection.querySelector(
      'h3.subtitle'
    ) as HTMLElement | null;
    const aboutParagraphs = aboutSection.querySelectorAll(
      '.about-content .text-wrapper p'
    ) as NodeListOf<HTMLElement>;

    const ratio = entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0);

    if (!entry.isIntersecting || ratio <= this.EXIT_THRESHOLD) {
      this.resetTyping();
      if (aboutSubtitle) aboutSubtitle.textContent = '';

      // renderer.addClass(this.document.documentElement, 'light-theme');
      // renderer.removeClass(this.document.documentElement, 'dark-theme');

      // this.setTheme(renderer, 'light');

      aboutSection.animate(
        [
          { transform: 'translateX(0)', filter: 'blur(1px)', opacity: 1 },
          { transform: 'translateX(200px)', opacity: 0 },
          { transform: 'translateX(0)', opacity: 0 },
        ],
        { duration: 200, fill: 'forwards' }
      );

      aboutParagraphs.forEach((p) =>
        p.animate([{ opacity: 1 }, { opacity: 0 }], { fill: 'forwards' })
      );

      this.aboutAnimating = false;
      return;
    }

    if (
      entry.isIntersecting &&
      ratio >= this.START_THRESHOLD &&
      !this.aboutAnimating
    ) {
      this.aboutAnimating = true;

      // renderer.addClass(this.document.documentElement, 'dark-theme');
      // renderer.removeClass(this.document.documentElement, 'light-theme');
      this.setTheme(renderer, 'dark');

      const sectionAnim = aboutSection.animate(
        [
          {
            transform:
              window.innerWidth <= 768
                ? 'translateX(-70px)'
                : 'translateX(-200px)',
            opacity: 0,
            filter: 'blur(1px)',
          },
          {
            transform:
              window.innerWidth <= 768
                ? 'translateX(20px)'
                : 'translateX(50px)',
            opacity: 0.5,
          },
          { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
        ],
        { duration: 1000, fill: 'forwards' }
      );

      this.animateParagraphs(aboutParagraphs);

      const subtitleText = 'Building interactive apps with style 🚀';
      setTimeout(() => {
        if (aboutSubtitle) this.startTyping(aboutSubtitle, subtitleText);
      }, 400);

      const animations: Promise<void>[] = [];
      if (sectionAnim?.finished)
        animations.push(sectionAnim.finished.then(() => {}));

      if (animations.length === 0) {
        setTimeout(() => (this.aboutAnimating = false), 1200);
      } else {
        Promise.all(animations).finally(() =>
          setTimeout(() => (this.aboutAnimating = false), 150)
        );
      }
    }
  }

  private animateParagraphs(paragraphs: NodeListOf<HTMLElement>) {
    Array.from(paragraphs).forEach((p, i) => {
      setTimeout(() => {
        p.animate(this.paragraphsAnimation, {
          duration: 500,
          fill: 'forwards',
        });
      }, i * 200);
    });
  }

  private startTyping(element: Element, text: string) {
    this.resetTyping();

    element.textContent = '';
    let i = 0;

    this.typingInterval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) this.resetTyping();
    }, 40);
  }

  private resetTyping() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  techStackAndHtmlAnimate(
    entry: IntersectionObserverEntry,
    renderer: Renderer2
  ) {
    if (!this.isBrowser) return;

    const base = entry.target as HTMLElement;
    const techStackSection = base.matches?.('section.tech-stack')
      ? base
      : base.querySelector('section.tech-stack') ?? base;

    if (!techStackSection) return;

    const ratio = entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0);

    if (entry.isIntersecting && ratio >= this.START_THRESHOLD) {
      this.setTheme(renderer, 'green-light');

      const sectionAnim = techStackSection.animate(
        [
          {
            transform:
              window.innerWidth <= 768
                ? 'translateX(-70px)'
                : 'translateX(-200px)',
            opacity: 0,
            filter: 'blur(1px)',
          },
          {
            transform:
              window.innerWidth <= 768
                ? 'translateX(20px)'
                : 'translateX(50px)',
            opacity: 0.5,
          },
          { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
        ],
        { duration: 1000, fill: 'forwards' }
      );

      const animations: Promise<void>[] = [];
      if (sectionAnim?.finished)
        animations.push(sectionAnim.finished.then(() => {}));

      if (animations.length === 0) {
        setTimeout(() => (this.techStackAnimating = false), 1200);
      } else {
        Promise.all(animations).finally(() =>
          setTimeout(() => (this.techStackAnimating = false), 150)
        );
      }
    }
  }

  homeAndHtmlAnimate(entry: IntersectionObserverEntry, renderer: Renderer2) {
    if (!this.isBrowser) return;

    const base = entry.target as HTMLElement;
    const homeSection = base.matches?.('section.home')
      ? base
      : base.querySelector('section.home') ?? base;

    if (!homeSection) return;

    const ratio = entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0);

    if (entry.isIntersecting && ratio >= this.START_THRESHOLD) {
      this.setTheme(renderer, 'light');
    }
  }

  projectsAndHtmlAnimate(
    entry: IntersectionObserverEntry,
    renderer: Renderer2
  ) {
    if (!this.isBrowser) return;

    const base = entry.target as HTMLElement;
    const techStackSection = base.matches?.('section.tech-stack')
      ? base
      : base.querySelector('section.tech-stack') ?? base;

    if (!techStackSection) return;

    const ratio = entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0);

    if (entry.isIntersecting && ratio >= this.START_THRESHOLD) {
      this.setTheme(renderer, 'rose-dark');

      const sectionAnim = techStackSection.animate(
        [
          {
            transform:
              window.innerWidth <= 768
                ? 'translateX(-70px)'
                : 'translateX(-200px)',
            opacity: 0,
            filter: 'blur(1px)',
          },
          {
            transform:
              window.innerWidth <= 768
                ? 'translateX(20px)'
                : 'translateX(50px)',
            opacity: 0.5,
          },
          { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
        ],
        { duration: 1000, fill: 'forwards' }
      );

      const animations: Promise<void>[] = [];
      if (sectionAnim?.finished)
        animations.push(sectionAnim.finished.then(() => {}));

      if (animations.length === 0) {
        setTimeout(() => (this.techStackAnimating = false), 1200);
      } else {
        Promise.all(animations).finally(() =>
          setTimeout(() => (this.techStackAnimating = false), 150)
        );
      }
    }
  }
}
