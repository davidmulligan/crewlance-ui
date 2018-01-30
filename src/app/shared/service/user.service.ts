import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { DataService } from './data.service';

@Injectable()
export class UserService extends DataService {

  constructor(http: HttpClient) {
    super(http, environment.apiUrl + '/users');
  }

  getCurrentApplicationUser() {
    return this.http.get(this.url + '/current', this.getRequestOptions()).catch(this.handleError);
  }
}
