import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { Project } from 'shared/model/project';
import { ProjectService } from 'shared/service/project.service';

@Component({
  selector: 'freelancer-project',
  templateUrl: './freelancer-project.component.html',
  styleUrls: ['./freelancer-project.component.css']
})
export class FreelancerProjectComponent implements OnInit, OnDestroy {

  private projects: Project[];
  private project: Project;
  private subscriptions: Subscription[] = [];

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.filter();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private filter(query?: string) {
    this.subscriptions.push(this.projectService.search(query ? { title: query } : null).subscribe(
      projects => {
        this.projects = projects;
        if (projects.length > 0) {
          this.selectProject(projects[0]);
        } else {
          this.selectProject(null);
        }
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }

  private selectProject(project: Project) {
    this.project = project;
  }
}
