import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { BadRequestException } from 'shared/exception/bad-request-exception';
import { User } from 'shared/model/user';
import { AuthService } from 'shared/service/auth.service';

@Component({
  selector: 'user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.css']
})
export class UserRegistrationFormComponent implements OnDestroy {

  private user: User = <User>{};
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  save(user: User) {
    this.subscriptions.push(this.authService.register(user).subscribe(
      response => {
        this.toastr.success('You were successfully registered.');
        this.router.navigate(['/login']);
      },
      (error: ApplicationException) => {
        if (error instanceof BadRequestException) {
          this.toastr.error('An unexpected error occured, please contact our help desk.', 'Error');
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
