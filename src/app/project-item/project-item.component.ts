import { Component, Input } from '@angular/core';
import { Project } from '../shared/types/project.interface';

@Component({
  selector: 'app-project-item',
  imports: [],
  standalone: true,
  templateUrl: './project-item.component.html',
  styleUrl: './project-item.component.scss',
})
export class ProjectItemComponent {
  @Input() project!: Project;
}
