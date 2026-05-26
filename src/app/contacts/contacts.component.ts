import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';

import { ContactItem } from '../shared/types/contactItem.interface';

@Component({
  selector: 'app-contacts',
  imports: [MatButtonModule, MatRippleModule],
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.component.media.scss'],
})
export class ContactsComponent {
  @ViewChild('contacts', { static: false })
  contacts!: ElementRef<HTMLElement>;

  contactList: ContactItem[] = [
    {
      icon: './assets/contact-icons/github.svg',
      link: 'https://github.com/ZeroaNinea',
      alt: 'GitHub',
    },
    {
      icon: './assets/contact-icons/gmail.svg',
      link: 'mailto:heghine.dev357@gmail.com',
      alt: 'Gmail',
    },
    {
      icon: './assets/contact-icons/linkedin.svg',
      link: 'https://www.linkedin.com/in/heghine-avetisyan-650291384/',
      alt: 'Linkedin',
    },
    {
      icon: './assets/contact-icons/twitter.svg',
      link: 'https://x.com/quiraxia65932',
      alt: 'Twitter',
    },
    {
      icon: './assets/contact-icons/medium.svg',
      link: 'https://medium.com/@heghine.dev357',
      alt: 'Medium',
    },
    {
      icon: './assets/contact-icons/devto.svg',
      link: 'https://dev.to/zeroaninea_8bec34a4e7d029',
      alt: 'Dev.to',
    },
  ];

  date() {
    return new Date();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
