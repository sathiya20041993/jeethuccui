import { CookieService } from 'ngx-cookie-service';
import { CouchingCenterService } from './../admin-pages/services/couching-center.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-certificate-report',
  templateUrl: './pending-certificate-report.component.html',
  styleUrls: ['./pending-certificate-report.component.scss']
})
export class PendingCertificateReportComponent implements OnInit {
  selectedCenters;
  
  showFailureResponseNotification;
  showSuccessResponseNotification;
  showFillMandetoryValidation;
  selectedCenter;
  centerList;
  batchesReport;
  isAdminUser = false;
  cols;
  constructor(private couchingCenterService: CouchingCenterService, private _cookieService: CookieService) {


    let userRole = this._cookieService.get('userRole');

    if (userRole === 'ADMIN') {
      this.isAdminUser = true;
      this.couchingCenterService.getAllCouchingCenters().subscribe(response => {

        let date = response.json();
        this.centerList = date.data;
        console.log(this.centerList);
      });

    }

    this.cols = [
      { field: 'centerId', header: 'Center Id' },
      { field: 'batchName', header: 'Batch Name' },
   

    ];

  }

  fetchReport() {
    debugger;
    this.couchingCenterService.getBatchesWithPendingCertificate(this.selectedCenter.centerSeq).subscribe(response => {

      let date = response.json();
      this.batchesReport = date.data;
    
    });
  }

  ngOnInit() {
  }

}