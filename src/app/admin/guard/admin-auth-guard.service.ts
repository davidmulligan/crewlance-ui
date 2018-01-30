import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'shared/service/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authService.currentUser.scopes.indexOf('ROLE_ADMIN') !== -1) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
