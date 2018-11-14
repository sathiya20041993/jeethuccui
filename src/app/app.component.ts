import { LogoutService } from './logout.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NbMenuService } from '@nebular/theme';
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private logoutService: LogoutService, private analytics: AnalyticsService, private menuService: NbMenuService, private cookieService: CookieService, private router: Router) {

    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContecxtItemSelection(event.item.title);
      });

  }



  onContecxtItemSelection(title) {
    console.log(title);
    if (title === 'Log out') {

      let logout = {
        userName: this.cookieService.get('userId')

      }

      this.logoutService.logout(logout).subscribe(res => {

        let response = res.json();

       
        this.cookieService.deleteAll();
        window.location.reload();
        this.router.navigateByUrl('login')

      });

    }

    else if (title === 'Update Password') {
      this.router.navigateByUrl('pages/passwordUpdate')
    }

  }

  ngOnInit() {
    this.analytics.trackPageViews();
  }
}
