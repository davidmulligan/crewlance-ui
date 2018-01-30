import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { Project } from 'shared/model/project';
import { ProjectService } from 'shared/service/project.service';

@Component({
  selector: 'client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.css']
})
export class ClientProjectComponent implements OnInit, OnDestroy {

  private projects: Project[];
  private filteredProjects: Project[];
  private subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal, private projectService: ProjectService) { }

  ngOnInit() {
    this.fetchProjects();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filter(query: string) {
    if (query) {
      this.filteredProjects = this.projects.filter(project => project.title.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.filteredProjects = this.projects;
    }
  }

  private fetchProjects() {
    this.subscriptions.push(this.projectService.getAll().subscribe(
      projects => {
        this.filteredProjects = this.projects = projects;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }
}
