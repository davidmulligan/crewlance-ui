import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { BadRequestException } from 'shared/exception/bad-request-exception';
import { NotFoundException } from 'shared/exception/not-found-exception';
import { Category } from 'shared/model/category';
import { Project } from 'shared/model/project';
import { CategoryService } from 'shared/service/category.service';
import { ProjectService } from 'shared/service/project.service';

@Component({
  selector: 'client-project-form',
  templateUrl: './client-project-form.component.html',
  styleUrls: ['./client-project-form.component.css']
})
export class ClientProjectFormComponent implements OnInit, OnDestroy {

  private id: string;
  private project: Project = <Project> {};
  private categories: Category[];
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private projectService: ProjectService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.id) {
      this.subscriptions.push(this.projectService.get(this.id).subscribe(
        project => {
          this.project = project;
        },
        (error: ApplicationException) => {
          if (error instanceof NotFoundException) {
            this.toastr.error('The project was not found.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    }
    this.subscriptions.push(this.categoryService.getAll().subscribe(
      categories => {
        this.categories = categories;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  save(project: Project) {
    if (this.id) {
      this.subscriptions.push(this.projectService.update(this.id, project).subscribe(
        response => {
          this.toastr.success('The project was successfully saved.');
          this.router.navigate(['/client/projects']);
        },
        (error: ApplicationException) => {
          if (error instanceof BadRequestException) {
            this.toastr.error('An unexpected error occured.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    } else {
      this.subscriptions.push(this.projectService.create(project).subscribe(
        response => {
          this.toastr.success('The project was successfully saved.');
          this.router.navigate(['/client/projects']);
        },
        (error: ApplicationException) => {
          if (error instanceof BadRequestException) {
            this.toastr.error('An unexpected error occured.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    }
  }

  delete() {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }
    this.subscriptions.push(this.projectService.delete(this.id).subscribe(
      response => {
        this.toastr.success('The project was successfully deleted.');
        this.router.navigate(['/client/projects']);
      },
      (error: ApplicationException) => {
        if (error instanceof BadRequestException) {
          this.toastr.error('An unexpected error occured.', 'Error');
        } else {
          throw error;
        }
      }
    ));
  }

  private compareById(object1, object2) {
    return object1 && object2 && object1.id === object2.id;
  }
}
