import { environment } from './../../environments/environment';



import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  userData;

  constructor(private http: Http) { }





  login(request) {
    return this.http.post(environment.url + "user/login", request);
  }

  getUserInfo(){

  }

}
