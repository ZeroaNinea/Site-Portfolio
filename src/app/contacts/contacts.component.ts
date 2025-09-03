import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-contacts',
  imports: [MatButtonModule, MatRippleModule],
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss', './contacts.media.component.scss'],
})
export class ContactsComponent {
  openLink(url: string) {
    window.open(url, '_blank');
  }
}
