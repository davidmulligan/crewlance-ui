import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminUserModalComponent } from 'app/admin/component/admin-user-modal/admin-user-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { User } from 'shared/model/user';
import { UserService } from 'shared/service/user.service';

@Component({
  selector: 'admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit, OnDestroy {

  private users: User[];
  private filteredUsers: User[];
  private subscriptions: Subscription[] = [];

  constructor(private modalService: NgbModal, private userService: UserService) { }

  ngOnInit() {
    this.fetchUsers();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  filter(query: string) {
    if (query) {
      this.filteredUsers = this.users.filter(user => {
        return user.firstName.toLowerCase().includes(query.toLowerCase()) || user.lastName.toLowerCase().includes(query.toLowerCase());
      });
    } else {
      this.filteredUsers = this.users;
    }
  }

  openModal(userId: number) {
    const modalRef = this.modalService.open(AdminUserModalComponent, { size: 'lg' });
    (<AdminUserModalComponent> modalRef.componentInstance).userId = userId;
    modalRef.result.then((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  private fetchUsers() {
    this.subscriptions.push(this.userService.getAll().subscribe(
      users => {
        this.filteredUsers = this.users = users;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }
}
