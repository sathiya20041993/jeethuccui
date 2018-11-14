import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';

import {Observable} from 'rxjs';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Update Password' }, { title: 'Log out' , click(){ this.UserMenuClick()} }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
             ) {


           

            
             
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users);


      setInterval(()=>{
        this.userService.getUsers()
      .subscribe((users: any) => this.user = users);
      },3000);
     
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  UserMenuClick(){

    
  }

  menuClick(event){
    debugger;
  }


  onContecxtItemSelection(title) {
    console.log('click', title);
  }

}
