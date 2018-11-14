import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Component } from '@angular/core';

import { ADMIN_MENU_ITEMS, COUNSELOR_MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  menu;
  constructor(private _cookieService: CookieService, private _router: Router
  ) {

    let userRole = _cookieService.get('userRole');
    if (userRole === 'ADMIN') {
      this.menu = ADMIN_MENU_ITEMS;
      this._router.navigateByUrl('pages/center/view');

    } else if (userRole === 'COUNSELOR' ||  userRole === 'CENTER HEAD') {

      this.menu = COUNSELOR_MENU_ITEMS;
      this._router.navigateByUrl('pages/student/list');
    }


  }


}
