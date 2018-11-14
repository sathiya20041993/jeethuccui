import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userName;
  password;
  showAuthenticationError = false;
  constructor(private _loginService: LoginService, private cookieService: CookieService, private router : Router) {

 


  }

  ngOnInit() {
  }


  login() {
    let login = {
      userName: this.userName,
      password: this.password
    }

    this._loginService.login(login).subscribe(res => {
      let userdata = res.json();

      console.log(userdata);

      if(userdata.code == 200){
      this.cookieService.set('logged-user', userdata);
      this.cookieService.set('userSeq', userdata.data.userSeq);
      this.cookieService.set('userId', userdata.data.userId);
      this.cookieService.set('centerSeq', userdata.data.centerSeq);
      this.cookieService.set('sessionId', userdata.data.sessionId);
      this.cookieService.set('userRole', userdata.data.role[0]);

      this.router.navigateByUrl("pages/center/view?seq="+ userdata.data.userId);
     
    
    }else {
       this. showAuthenticationError = true;
      }

    });

  }
}
