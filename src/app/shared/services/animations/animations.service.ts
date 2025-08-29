import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AnimationsService {
  private document = inject(DOCUMENT);

  private html = this.document.querySelector('html');
  private aboutSection = this.document.querySelector('section.about');
  private aboutSubtitle = this.document.querySelector('.about h3.subtitle');
  private aboutParagraphs = this.document.querySelectorAll(
    'section.about .about-content .text-wrapper p'
  );

  private paragraphsAnimation = [
    {
      transform: 'translateX(-100px)',
      opacity: 0,
      filter: 'blur(1px)',
    },
    {
      transform: 'translateX(20px)',
      opacity: 0.5,
    },
    {
      transform: 'translateX(0)',
      filter: 'blur(0px)',
      opacity: 1,
    },
  ];
  private typingInterval: any;

  aboutAndHtmlAnimate(entry: IntersectionObserverEntry, renderer: Renderer2) {
    if (entry.isIntersecting) {
      renderer.addClass(this.html, 'dark-theme');
      renderer.removeClass(this.html, 'light-theme');

      this.aboutSection?.animate(
        [
          {
            transform: 'translateX(-200px)',
            opacity: 0,
            filter: 'blur(1px)',
          },
          {
            transform: 'translateX(50px)',
            opacity: 0.5,
          },
          {
            transform: 'translateX(0)',
            filter: 'blur(0px)',
            opacity: 1,
          },
        ],
        {
          duration: 1000,
          fill: 'forwards',
        }
      );

      setTimeout(() => {
        const text = 'Building interactive apps with style 🚀';

        // this.aboutSubtitle!.textContent = '';
        this.textTypingEffect(this.aboutSubtitle!, text);
      }, 400);

      setTimeout(() => {
        this.aboutParagraphs[0].animate(this.paragraphsAnimation, {
          duration: 500,
          fill: 'forwards',
        });

        setTimeout(() => {
          this.aboutParagraphs[1].animate(this.paragraphsAnimation, {
            duration: 500,
            fill: 'forwards',
          });

          setTimeout(() => {
            this.aboutParagraphs[2].animate(this.paragraphsAnimation, {
              duration: 500,
              fill: 'forwards',
            });
          }, 200);
        }, 200);
      }, 200);
    } else {
      renderer.addClass(this.html, 'light-theme');
      renderer.removeClass(this.html, 'dark-theme');

      this.aboutSection?.animate(
        [
          {
            transform: 'translateX(0)',
            filter: 'blur(1px)',
            opacity: 1,
          },
          {
            transform: 'translateX(200px)',
            opacity: 0,
          },
          {
            transform: 'translateX(0)',
            opacity: 0,
          },
        ],
        {
          duration: 200,
          fill: 'forwards',
        }
      );

      this.aboutParagraphs.forEach((p) => {
        p.animate(
          [
            {
              opacity: 1,
            },
            {
              opacity: 0,
            },
          ],
          {
            fill: 'forwards',
          }
        );
      });
    }
  }

  textTypingEffect(element: Element, text: string) {
    // stop previous typing if still running
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
