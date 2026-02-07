import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';

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
  date() {
    return new Date();
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
