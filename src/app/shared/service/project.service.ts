import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { DataService } from './data.service';

@Injectable()
export class ProjectService extends DataService {

  constructor(http: HttpClient) {
    super(http, environment.apiUrl + '/projects');
  }

  search(params: any) {
    return this.http.get(this.url + '/search', this.getRequestOptions({search: params})).catch(this.handleError);
  }
}
