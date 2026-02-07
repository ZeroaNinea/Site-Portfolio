import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cyber-lines',
  imports: [],
  standalone: true,
  templateUrl: './cyber-lines.component.html',
  styleUrl: './cyber-lines.component.scss',
})
export class CyberLinesComponent {
  @Input({ required: true }) width!: string;
  @Input({ required: true }) height!: string;
}
