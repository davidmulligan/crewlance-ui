import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { Project } from 'shared/model/project';
import { ProjectService } from 'shared/service/project.service';

@Component({
  selector: 'admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.css']
})
export class AdminProjectComponent implements OnInit, OnDestroy {

  private projects: Project[];
  private subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal, private projectService: ProjectService) { }

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
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }
}
