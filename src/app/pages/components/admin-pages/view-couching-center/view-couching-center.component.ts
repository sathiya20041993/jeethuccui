import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CouchingCenterService } from './../services/couching-center.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-couching-center',
  templateUrl: './view-couching-center.component.html',
  styleUrls: ['./view-couching-center.component.css']
})
export class ViewCouchingCenterComponent implements OnInit {

  selectedCenters;
  pageName = "Centers"
  centerList = [];
  cols: any[];


  constructor(private router: Router ,private _cookieService : CookieService, private _couchingCenterServices: CouchingCenterService) {

    this._couchingCenterServices.getAllCouchingCenters().subscribe(response => {

      let date = response.json();
      this.centerList = date.data;
      console.log(this.centerList);
    });

    this.cols = [
      { field: 'centerId', header: 'Center Id' },
      { field: 'phone', header: 'Phone' },
      { field: 'postalAddress', header: 'Address' },

    ];

  }

  ngOnInit() {

    let userRole = this._cookieService.get('userRole');

    if (userRole !== 'ADMIN') {

      this.router.navigateByUrl('login');

    }
  }


  update(center) {

    
this.router.navigateByUrl('pages/center/edit/'+center.centerId);
  }
}
