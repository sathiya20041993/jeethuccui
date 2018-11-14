import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { environment } from './../../../../../environments/environment';



import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { iif } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  environment;

  constructor(private http: Http , private cookieService : CookieService) { }

  createAuthHeader(headers: Headers) {
    headers.append('userId', this.cookieService.get('userId'));
    headers.append('sessionId', this.cookieService.get('sessionId')); 
  }


  getAllProjects(){
    return this.http.get(environment.url + "project/list");
  }

  saveCouchingCenter(centerData) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.url + "couching-center/save", centerData, options);
  }


  getCenterDetails(centerId) {

    let headers = new Headers();
    this.createAuthHeader(headers);
    return this.http.get(environment.url + "couching-center/get/" + centerId , {headers: headers});
  }



}
