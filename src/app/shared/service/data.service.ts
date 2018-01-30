import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApplicationException } from '../../shared/exception/application-exception';
import { BadRequestException } from '../../shared/exception/bad-request-exception';
import { NotAuthorisedException } from '../../shared/exception/not-authorised-exception';
import { NotFoundException } from '../../shared/exception/not-found-exception';

@Injectable()
export class DataService {

  constructor(protected http: HttpClient , protected url: string) { }

  create(resource) {
    return this.http.post(this.url, JSON.stringify(resource), this.getRequestOptions()).catch(this.handleError);
  }

  update(id, resource) {
    resource.id = id;
    return this.http.put(this.url, JSON.stringify(resource), this.getRequestOptions()).catch(this.handleError);
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id, this.getRequestOptions()).catch(this.handleError);
  }

  getAll() {
    return this.http.get(this.url, this.getRequestOptions()).catch(this.handleError);
  }

  get(id) {
    return this.http.get(this.url + '/' + id, this.getRequestOptions()).catch(this.handleError);
  }

  protected getRequestOptions(set?: any, responseType?: string): any {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let params = new HttpParams();
    if (set != null && typeof set !== 'undefined') {
      if (set.hasOwnProperty('headers')) {
        Object.keys(set.headers).forEach(header => {
          headers = headers.append(header, set.headers[header]);
        });
      }
      if (set.hasOwnProperty('search') && set.search !== null) {
        Object.keys(set.search).forEach(param => {
          params = params.append(param, set.search[param]);
        });
      }
    }
    return {
      headers: headers,
      params: params,
      responseType: responseType || 'json'
    };
  }

  protected handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadRequestException(error.json()));
    } else if (error.status === 401) {
      return Observable.throw(new NotAuthorisedException());
    } else if (error.status === 404) {
      return Observable.throw(new NotFoundException());
    } else {
      return Observable.throw(new ApplicationException(error));
    }
  }
}
