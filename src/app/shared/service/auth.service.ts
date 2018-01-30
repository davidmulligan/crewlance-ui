import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

import { environment } from './../../../environments/environment';
import { DataService } from './data.service';

@Injectable()
export class AuthService extends DataService {

  constructor(http: HttpClient, private router: Router) {
    super(http, environment.apiUrl);
  }

  register(resource) {
    return this.http.post(this.url + '/auth/register', JSON.stringify(resource), this.getRequestOptions()).catch(this.handleError);
  }

  login(credentials) {
    return this.http.post(this.url + '/auth/login', JSON.stringify(credentials), this.getRequestOptions())
      .map(response => {
        if (response) {
          localStorage.setItem('token', response['token']);
          return true;
        } else {
          return false;
        }
      })
      .catch(this.handleError);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLoggedIn() {
    return tokenNotExpired();
  }

  get currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return new JwtHelper().decodeToken(token);
  }
}
