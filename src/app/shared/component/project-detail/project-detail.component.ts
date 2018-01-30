import { Component, Input } from '@angular/core';

import { Project } from './../../model/project';

@Component({
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent {

  @Input('project')
  project: Project;

  constructor() { }
}
