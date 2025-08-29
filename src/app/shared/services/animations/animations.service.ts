// import { Injectable, inject } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
// import { Renderer2 } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class AnimationsService {
//   private document = inject(DOCUMENT);

//   private html = this.document.querySelector('html');
//   private aboutSection = this.document.querySelector('section.about');
//   private aboutSubtitle = this.document.querySelector('.about h3.subtitle');
//   private aboutParagraphs = this.document.querySelectorAll(
//     'section.about .about-content .text-wrapper p'
//   );

//   private paragraphsAnimation = [
//     {
//       transform: 'translateX(-100px)',
//       opacity: 0,
//       filter: 'blur(1px)',
//     },
//     {
//       transform: 'translateX(20px)',
//       opacity: 0.5,
//     },
//     {
//       transform: 'translateX(0)',
//       filter: 'blur(0px)',
//       opacity: 1,
//     },
//   ];
//   private typingInterval: any;
//   private aboutAnimating = false;

//   aboutAndHtmlAnimate(entry: IntersectionObserverEntry, renderer: Renderer2) {
//     if (entry.isIntersecting && !this.aboutAnimating) {
//       this.aboutAnimating = true;

//       renderer.addClass(this.html, 'dark-theme');
//       renderer.removeClass(this.html, 'light-theme');

//       this.aboutSection?.animate(
//         [
//           {
//             transform:
//               window.innerWidth <= 768
//                 ? 'translateX(-70px)'
//                 : 'translateX(-200px)',
//             opacity: 0,
//             filter: 'blur(1px)',
//           },
//           {
//             transform:
//               window.innerWidth <= 768
//                 ? 'translateX(20px)'
//                 : 'translateX(50px)',
//             opacity: 0.5,
//           },
//           {
//             transform: 'translateX(0)',
//             filter: 'blur(0px)',
//             opacity: 1,
//           },
//         ],
//         {
//           duration: 1000,
//           fill: 'forwards',
//         }
//       );

//       setTimeout(() => {
//         const text = 'Building interactive apps with style 🚀';

//         this.textTypingEffect(this.aboutSubtitle!, text);
//       }, 400);

//       setTimeout(() => {
//         this.aboutParagraphs[0].animate(this.paragraphsAnimation, {
//           duration: 500,
//           fill: 'forwards',
//         });

//         setTimeout(() => {
//           this.aboutParagraphs[1].animate(this.paragraphsAnimation, {
//             duration: 500,
//             fill: 'forwards',
//           });

//           setTimeout(() => {
//             this.aboutParagraphs[2].animate(this.paragraphsAnimation, {
//               duration: 500,
//               fill: 'forwards',
//             });
//           }, 200);
//         }, 200);
//       }, 200);
//     } else {
//       renderer.addClass(this.html, 'light-theme');
//       renderer.removeClass(this.html, 'dark-theme');

//       this.aboutSection?.animate(
//         [
//           {
//             transform: 'translateX(0)',
//             filter: 'blur(1px)',
//             opacity: 1,
//           },
//           {
//             transform: 'translateX(200px)',
//             opacity: 0,
//           },
//           {
//             transform: 'translateX(0)',
//             opacity: 0,
//           },
//         ],
//         {
//           duration: 200,
//           fill: 'forwards',
//         }
//       );

//       this.aboutParagraphs.forEach((p) => {
//         p.animate(
//           [
//             {
//               opacity: 1,
//             },
//             {
//               opacity: 0,
//             },
//           ],
//           {
//             fill: 'forwards',
//           }
//         );
//       });
//     }

//     this.aboutAnimating = false;
//   }

//   textTypingEffect(element: Element, text: string) {
//     if (this.typingInterval) {
//       clearInterval(this.typingInterval);
//       this.typingInterval = null;
//     }

//     element.textContent = '';
//     let i = 0;

//     this.typingInterval = setInterval(() => {
//       element.textContent += text[i];
//       i++;
//       if (i >= text.length) {
//         clearInterval(this.typingInterval);
//         this.typingInterval = null;
//       }
//     }, 40);
//   }
// }

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

  // hysteresis thresholds:
  // start when ratio >= START_THRESHOLD
  // consider "exited" only when ratio <= EXIT_THRESHOLD
  private START_THRESHOLD = 0.35;
  private EXIT_THRESHOLD = 0.1;

  aboutAndHtmlAnimate(entry: IntersectionObserverEntry, renderer: Renderer2) {
    // Use the observed target as the base — more reliable than global querySelector
    const base = entry.target as HTMLElement;

    // Find the actual section / subtitle / paragraphs inside the observed target.
    // This handles cases where you observe '#about' wrapper or the actual section
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

    // EXIT logic (only when it's clearly out)
    if (!entry.isIntersecting || ratio <= this.EXIT_THRESHOLD) {
      // cancel typing if running and clear subtitle so re-enter restarts clean
      if (this.typingInterval) {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
      }
      if (aboutSubtitle) aboutSubtitle.textContent = '';

      renderer.addClass(this.document.documentElement, 'light-theme');
      renderer.removeClass(this.document.documentElement, 'dark-theme');

      // subtle exit animation
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

      // allow future re-entry after it's clearly out
      this.aboutAnimating = false;
      return;
    }

    // START logic — only when sufficiently in view and not already animating
    if (
      entry.isIntersecting &&
      ratio >= this.START_THRESHOLD &&
      !this.aboutAnimating
    ) {
      this.aboutAnimating = true;

      renderer.addClass(this.document.documentElement, 'dark-theme');
      renderer.removeClass(this.document.documentElement, 'light-theme');

      // section animation (returns Animation)
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

      // paragraph animations (start after small delay so they stagger similarly to before)
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

      // typing: start slightly after the section begins
      const subtitleText = 'Building interactive apps with style 🚀';
      setTimeout(() => {
        if (aboutSubtitle) this.startTyping(aboutSubtitle, subtitleText);
      }, 400);

      // Wait for major animations to finish, then release guard.
      // Use promises from the animations to be accurate (no magic timeouts).
      const promises: Promise<void>[] = [];
      if (sectionAnim?.finished)
        promises.push(sectionAnim.finished.then(() => {}));
      paragraphAnims.forEach((a) => {
        if (a?.finished) promises.push(a.finished.then(() => {}));
      });

      // If there are no animations (unexpected), set a fallback timeout
      if (promises.length === 0) {
        setTimeout(() => (this.aboutAnimating = false), 1200);
      } else {
        Promise.all(promises).finally(() => {
          // small extra debounce to avoid immediate retrigger on micro-scroll
          setTimeout(() => (this.aboutAnimating = false), 150);
        });
      }
    }
  }

  private startTyping(element: Element, text: string) {
    // clear any previous typing
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
