import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './../../../@core/data/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {


  oldPassword;
  newPassword;
  showPasswordUpdateFailed = false;
  showPasswordUpdateSuccess = false;
  errorMessage;
  constructor(private userService: UserService, private cookieService: CookieService, private router: Router) { }

  ngOnInit() {
  }


  updatePassword() {
    let requestData = {
      userId: this.cookieService.get('userId'),
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }
    if (this.oldPassword === undefined || this.oldPassword === '' || this.newPassword === undefined || this.newPassword === '') {

      this.showPasswordUpdateFailed = true;
      this.errorMessage = "Old And New Password  Required";
      return;
    }

    this.userService.updatePassWord(requestData).subscribe(response => {

      let responseJson = response.json();
      if (responseJson.data) {
        this.showPasswordUpdateSuccess = true;
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.showPasswordUpdateSuccess = false;
          this.cookieService.deleteAll();
          this.router.navigateByUrl('/login');
        }, 3000);

      }
      else {
        this.showPasswordUpdateFailed = true;
        this.errorMessage = "Failed to update , Incorrect Information";
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.showPasswordUpdateFailed = false;
         
        }, 3000);
      }


    });

  }

}
