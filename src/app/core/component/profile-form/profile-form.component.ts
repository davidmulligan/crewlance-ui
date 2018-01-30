import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { BadRequestException } from 'shared/exception/bad-request-exception';
import { NotFoundException } from 'shared/exception/not-found-exception';
import { Skill } from 'shared/model/skill';
import { User } from 'shared/model/user';
import { SkillService } from 'shared/service/skill.service';
import { UserService } from 'shared/service/user.service';

@Component({
  selector: 'profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit, OnDestroy {

  private id: string;
  private user: User = <User>{};
  private skills: Skill[];
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private skillService: SkillService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(this.userService.getCurrentApplicationUser().subscribe(
      user => {
        this.user = user;
        this.id = user.id;
      },
      (error: ApplicationException) => {
        if (error instanceof NotFoundException) {
          this.toastr.error('The user was not found.', 'Error');
        } else {
          throw error;
        }
      }
    ));
    this.subscriptions.push(this.skillService.getAll().subscribe(
      skills => {
        this.skills = skills;
      },
      (error: ApplicationException) => {
        throw error;
      }
    ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  save(user: User) {
    this.subscriptions.push(this.userService.update(this.id, user).subscribe(
      response => {
        this.toastr.success('The user was successfully saved.');
        this.router.navigate(['/']);
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
