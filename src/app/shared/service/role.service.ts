import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { DataService } from './data.service';

@Injectable()
export class RoleService extends DataService {

  constructor(http: HttpClient) {
    super(http, environment.apiUrl + '/roles');
  }
}
