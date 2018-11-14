import { environment } from './../../../environments/environment';
import { Http, RequestOptions } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';

import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


let counter = 0;

@Injectable()
export class UserService {

  user;

  private userArray: any[];

  constructor(private cookieService: CookieService, private http: Http) {

    this.user = {
      name: this.cookieService.get('userId')
    }

  }

  getUsers(): Observable<any> {
    return observableOf(this.user);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }


  updatePassWord(requestData) {
    debugger;
    let headers = new Headers({ 'Content-Type': 'application/json' });
   
    return this.http.post(environment.url + "user/updatePassword", requestData);
  }
}
