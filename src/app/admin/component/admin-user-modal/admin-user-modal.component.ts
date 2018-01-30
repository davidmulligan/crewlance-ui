import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { BadRequestException } from 'shared/exception/bad-request-exception';
import { NotFoundException } from 'shared/exception/not-found-exception';
import { Role } from 'shared/model/role';
import { Skill } from 'shared/model/skill';
import { User } from 'shared/model/user';
import { RoleService } from 'shared/service/role.service';
import { SkillService } from 'shared/service/skill.service';
import { UserService } from 'shared/service/user.service';

@Component({
  selector: 'admin-user-modal',
  templateUrl: './admin-user-modal.component.html',
  styleUrls: ['./admin-user-modal.component.css']
})
export class AdminUserModalComponent implements OnInit, OnDestroy {

  private user: User = <User>{};
  private skills: Skill[];
  private roles: Role[];
  private existingObject = false;
  private subscriptions: Subscription[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private skillService: SkillService,
    private roleService: RoleService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.skillService.getAll().subscribe(
      skills => {
        this.skills = skills;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
    this.subscriptions.push(this.roleService.getAll().subscribe(
      roles => {
        this.roles = roles;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  set userId(userId: number) {
    if (userId) {
      this.subscriptions.push(this.userService.get(userId).subscribe(
        user => {
          this.user = user;
        },
        (error: ApplicationException) => {
          if (error instanceof NotFoundException) {
            this.toastr.error('The user was not found.', 'Error');
          } else {
            throw error;
          }
        }
      ));
    }
  }

  save(user: User) {
    if (user.id) {
      this.subscriptions.push(this.userService.update(user.id, user).subscribe(
        response => {
          this.toastr.success('The user was successfully saved.');
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
      this.subscriptions.push(this.userService.create(user).subscribe(
        response => {
          this.toastr.success('The user was successfully saved.');
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

  delete(user: User) {
    if (!confirm('Are you sure?')) {
      return;
    }
    this.subscriptions.push(this.userService.delete(user.id).subscribe(
      response => {
        this.toastr.success('The user was successfully deleted.');
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
    return this.user.id !== undefined;
  }

  private compareById(object1, object2) {
    return object1 && object2 && object1.id === object2.id;
  }
}
