import { CookieService } from 'ngx-cookie-service';
import { environment } from './../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: Http,  private cookieService: CookieService) { }


  logout(request) {
    return this.http.post(environment.url + "user/logout", request);
  }

  getSessionId(){
return this.cookieService.get('userId');
  }
}
