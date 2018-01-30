import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminCategoryModalComponent } from 'app/admin/component/admin-category-modal/admin-category-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { Category } from 'shared/model/category';
import { CategoryService } from 'shared/service/category.service';

@Component({
  selector: 'admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit, OnDestroy {

  private categories: Category[];
  private filteredCategories: Category[];
  private subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal, private categoryService: CategoryService) { }

  ngOnInit() {
    this.fetchCategories();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filter(query: string) {
    if (query) {
      this.filteredCategories = this.categories.filter(category => category.name.toLowerCase().includes(query.toLowerCase()));
    } else {
      this.filteredCategories = this.categories;
    }
  }

  openModal(categoryId: number) {
    const modalRef = this.modalService.open(AdminCategoryModalComponent, { size: 'lg' });
    (<AdminCategoryModalComponent> modalRef.componentInstance).categoryId = categoryId;
    modalRef.result.then((result) => {
      if (result) {
        this.fetchCategories();
      }
    });
  }

  private fetchCategories() {
    this.subscriptions.push(this.categoryService.getAll().subscribe(
      categories => {
        this.filteredCategories = this.categories = categories;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }
}
