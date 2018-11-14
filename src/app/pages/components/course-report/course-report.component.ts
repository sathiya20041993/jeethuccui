import { CookieService } from 'ngx-cookie-service';
import { CouchingCenterService } from './../admin-pages/services/couching-center.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-report',
  templateUrl: './course-report.component.html',
  styleUrls: ['./course-report.component.scss']
})
export class CourseReportComponent implements OnInit {

  selectedCenter;
  centerList;
  coursesReport;
  isAdminUser = false;
  showFailureResponseNotification;
  showSuccessResponseNotification;
  showFillMandetoryValidation;
  selectedCenters;
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

    } else {

      let userCenterSeq = this._cookieService.get('centerSeq');
      this.couchingCenterService.getCoursesInCenter(userCenterSeq).subscribe(response => {

        let date = response.json();
        this.coursesReport = date.data.courses;
        console.log(this.centerList);
      });
    }

    this.cols = [
      { field: 'courseName', header: 'Course Name' },
      { field: 'fees', header: 'Fees' },
   

    ];

  }

  fetchReport() {
    debugger;
    this.couchingCenterService.getCoursesInCenter(this.selectedCenter.centerSeq).subscribe(response => {

      let date = response.json();
      this.coursesReport = date.data.courses;
      console.log(this.centerList);
    });
  }

  ngOnInit() {
  }

}
