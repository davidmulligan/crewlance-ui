import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { BadRequestException } from 'shared/exception/bad-request-exception';
import { NotFoundException } from 'shared/exception/not-found-exception';
import { Category } from 'shared/model/category';
import { CategoryService } from 'shared/service/category.service';

@Component({
  selector: 'admin-category-modal',
  templateUrl: './admin-category-modal.component.html',
  styleUrls: ['./admin-category-modal.component.css']
})
export class AdminCategoryModalComponent implements OnDestroy {

  private category: Category = <Category>{};
  private existingObject = false;
  private subscriptions: Subscription[] = [];

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService, private categoryService: CategoryService) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  set categoryId(categoryId: number) {
    if (categoryId) {
      this.subscriptions.push(this.categoryService.get(categoryId).subscribe(
        category => {
          this.category = category;
        },
        (error: ApplicationException) => {
          if (error instanceof NotFoundException) {
            this.toastr.error('The category was not found.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    }
  }

  save(category: Category) {
    if (category.id) {
      this.subscriptions.push(this.categoryService.update(category.id, category).subscribe(
        response => {
          this.toastr.success('The category was successfully saved.');
          this.activeModal.close(true);
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
      this.subscriptions.push(this.categoryService.create(category).subscribe(
        response => {
          this.toastr.success('The category was successfully saved.');
          this.activeModal.close(true);
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

  delete(category: Category) {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.subscriptions.push(this.categoryService.delete(category.id).subscribe(
      response => {
        this.toastr.success('The category was successfully deleted.');
        this.activeModal.close(true);
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

  private isExistingObject() {
    return this.category.id !== undefined;
  }
}
