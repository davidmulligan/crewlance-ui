import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationException } from 'shared/exception/application-exception';
import { NotAuthorisedException } from 'shared/exception/not-authorised-exception';
import { AuthService } from 'shared/service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];
  private invalidLogin: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  signIn(credentials) {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    this.subscriptions.push(this.authService.login(credentials).subscribe(
      result => {
        this.router.navigate([returnUrl]);
      },
      (error: ApplicationException) => {
        if (error instanceof NotAuthorisedException) {
          this.invalidLogin = true;
        } else {
          throw error;
        }
      }
    ));
  }
}
