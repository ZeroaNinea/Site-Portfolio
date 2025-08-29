import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AnimationsService {
  private document = inject(DOCUMENT);

  private paragraphsAnimation = [
    { transform: 'translateX(-100px)', opacity: 0, filter: 'blur(1px)' },
    { transform: 'translateX(20px)', opacity: 0.5 },
    { transform: 'translateX(0)', filter: 'blur(0px)', opacity: 1 },
  ];

  private typingInterval: any = null;
  private aboutAnimating = false;

  private START_THRESHOLD = 0.35;
  private EXIT_THRESHOLD = 0.1;

  aboutAndHtmlAnimate(entry: IntersectionObserverEntry, renderer: Renderer2) {
    const base = entry.target as HTMLElement;

    const aboutSection =
      base.matches && base.matches('section.about')
        ? base
        : (base.querySelector('section.about') as HTMLElement) ?? base;

    const aboutSubtitle = aboutSection.querySelector(
      'h3.subtitle'
    ) as HTMLElement | null;
    const aboutParagraphs = aboutSection.querySelectorAll(
      '.about-content .text-wrapper p'
    ) as NodeListOf<HTMLElement>;

    const ratio = entry.intersectionRatio ?? (entry.isIntersecting ? 1 : 0);

    if (!entry.isIntersecting || ratio <= this.EXIT_THRESHOLD) {
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
      if (aboutSubtitle) aboutSubtitle.textContent = '';

      renderer.addClass(this.document.documentElement, 'light-theme');
      renderer.removeClass(this.document.documentElement, 'dark-theme');

      aboutSection?.animate(
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

      renderer.addClass(this.document.documentElement, 'dark-theme');
      renderer.removeClass(this.document.documentElement, 'light-theme');

      const sectionAnim = aboutSection?.animate(
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

      const paragraphAnims: Animation[] = [];
      setTimeout(() => {
        if (aboutParagraphs[0])
          paragraphAnims.push(
            aboutParagraphs[0].animate(this.paragraphsAnimation, {
              duration: 500,
              fill: 'forwards',
            })
          );
        setTimeout(() => {
          if (aboutParagraphs[1])
            paragraphAnims.push(
              aboutParagraphs[1].animate(this.paragraphsAnimation, {
                duration: 500,
                fill: 'forwards',
              })
            );
          setTimeout(() => {
            if (aboutParagraphs[2])
              paragraphAnims.push(
                aboutParagraphs[2].animate(this.paragraphsAnimation, {
                  duration: 500,
                  fill: 'forwards',
                })
              );
          }, 200);
        }, 200);
      }, 200);

      const subtitleText = 'Building interactive apps with style 🚀';
      setTimeout(() => {
        if (aboutSubtitle) this.startTyping(aboutSubtitle, subtitleText);
      }, 400);

      const promises: Promise<void>[] = [];
      if (sectionAnim?.finished)
        promises.push(sectionAnim.finished.then(() => {}));
      paragraphAnims.forEach((a) => {
        if (a?.finished) promises.push(a.finished.then(() => {}));
      });

      if (promises.length === 0) {
        setTimeout(() => (this.aboutAnimating = false), 1200);
      } else {
        Promise.all(promises).finally(() => {
          setTimeout(() => (this.aboutAnimating = false), 150);
        });
      }
    }
  }

  private startTyping(element: Element, text: string) {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }

    element.textContent = '';
    let i = 0;
    this.typingInterval = setInterval(() => {
      element.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
    }, 40);
  }
}
