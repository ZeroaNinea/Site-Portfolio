import {
  Injectable,
  inject,
  PLATFORM_ID,
  RendererFactory2,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Renderer2 } from '@angular/core';

import { Theme } from '../../types/theme.alias';

@Injectable({ providedIn: 'root' })
export class AnimationsService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private currentSectionId: string | null = null;
  private renderer!: Renderer2;

  private START_THRESHOLD = 0.35;
  private EXIT_THRESHOLD = 0.1;

  typingInterval: any = null;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private setTheme(theme: Theme) {
    const themes = [
      'light-theme',
      'dark-theme',
      'green-light-theme',
      'rose-dark-theme',
      'yellow-light-theme',
    ];
    themes.forEach((t) =>
      this.renderer.removeClass(this.document.documentElement, t)
    );

    const map: Record<string, string> = {
      hero: 'light-theme',
      about: 'dark-theme',
      'tech-stack': 'green-light-theme',
      projects: 'rose-dark-theme',
      contacts: 'yellow-light-theme',
    };

    const themeClass = map[this.currentSectionId ?? ''] ?? 'light-theme';
    this.renderer.addClass(this.document.documentElement, themeClass);
  }

  animateSection(entry: IntersectionObserverEntry) {
    if (!this.isBrowser) return;

    const section = entry.target as HTMLElement;
    const id = section.id;
    const ratio = entry.intersectionRatio;

    if (entry.isIntersecting && ratio >= this.START_THRESHOLD) {
      if (this.currentSectionId !== id) {
        this.currentSectionId = id;
        this.setThemeForSection(id);
        this.animateIn(section);
      }
    } else if (!entry.isIntersecting || ratio <= this.EXIT_THRESHOLD) {
      if (this.currentSectionId === id) {
        this.animateOut(section);
        this.currentSectionId = null;
      }
    }
  }

  private setThemeForSection(id: string) {
    const themeMap: Record<string, Theme> = {
      hero: 'light',
      about: 'dark',
      'tech-stack': 'green-light',
      projects: 'rose-dark',
      contacts: 'yellow-light',
    };
    this.setTheme(themeMap[id] ?? 'light');
  }

  private animateIn(element: HTMLElement) {
    const section = element.querySelector('section');

    if (!section) return;

    section.style.pointerEvents = 'auto';

    if (section?.classList.contains('about')) {
      const aboutSubtitle = section.querySelector(
        'h3.subtitle'
      ) as HTMLElement | null;
      const paragraphs = section.querySelectorAll(
        '.about-content .text-wrapper p'
      ) as NodeListOf<HTMLElement>;

      if (aboutSubtitle) {
        this.startTyping(
          aboutSubtitle,
          'Building interactive apps with style 🚀'
        );
      }
      this.animateParagraphs(paragraphs);
    }

    section?.animate(
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
            window.innerWidth <= 768 ? 'translateX(20px)' : 'translateX(50px)',
          opacity: 0.5,
        },
        { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
      ],
      { duration: 1000, fill: 'forwards' }
    );
  }

  private animateOut(element: HTMLElement) {
    const section = element.querySelector('section') as HTMLElement;

    if (!section) return;

    section.style.pointerEvents = 'none';

    section.animate(
      [
        { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
        { transform: 'translateX(200px)', filter: 'blur(1px)', opacity: 0 },
      ],
      { duration: 400, fill: 'forwards' }
    );
  }

  private animateParagraphs(paragraphs: NodeListOf<HTMLElement>) {
    Array.from(paragraphs).forEach((p, i) => {
      setTimeout(() => {
        p.animate(
          [
            {
              transform: 'translateX(-100px)',
              opacity: 0,
              filter: 'blur(1px)',
            },
            { transform: 'translateX(20px)', opacity: 0.5 },
            { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
          ],
          {
            duration: 500,
            fill: 'forwards',
          }
        );
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
}
