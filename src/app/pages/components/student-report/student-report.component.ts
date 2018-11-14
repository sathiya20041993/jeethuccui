import { CookieService } from 'ngx-cookie-service';
import { CouchingCenterService } from './../admin-pages/services/couching-center.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.scss']
})
export class StudentReportComponent implements OnInit {

  showFillMandetoryValidation = false;

  centers = [];

  counselors = [];

  cols = [];

  students = [];

  studentReportForm: FormGroup;
  userRole;

  totalDues = 0;
  showDateValidation = false;


  constructor(private _formBuilder: FormBuilder, private couchingCenterService: CouchingCenterService, private _cookieService: CookieService) { }

  ngOnInit() {

    this.cols = [
      { field: 'center', header: 'Center Id ' },
      { field: 'counselor', header: 'Counselor Name' },
      { field: 'studentId', header: 'Student Id' },
      { field: 'student', header: 'Student Name' },

      { field: 'courseName', header: 'Course Name' },

      { field: 'joinDate', header: 'Join Date' }
    ];

    this.userRole = this._cookieService.get('userRole');

    this.studentReportForm = this._formBuilder.group({
      centerId: [, Validators.required],
      counselorId: [],
      fromDate: [],
      toDate: []
    });

    if (this.userRole === 'ADMIN') {
      this.couchingCenterService.getAllCouchingCenters().subscribe(response => {

        let date = response.json();
        let lvPair = [];
        for (let obj of date.data) {
          lvPair.push({ label: obj.centerId, value: obj.centerSeq });
        }
        this.centers = lvPair;
      });

    } else if (this.userRole === 'CENTER HEAD' || this.userRole === 'CENTER%20HEAD') {
      console.log('Im center head');
      this.studentReportForm.get('centerId').setValue(this._cookieService.get('centerSeq'));
      this.fetchCounselors();
    } else if (this.userRole === 'COUNSELOR') {
      this.studentReportForm.get('centerId').setValue(this._cookieService.get('centerSeq'));
      this.studentReportForm.get('counselorId').setValue(this._cookieService.get('userSeq'));
    }

  }

  onHideNotification() {
    this.showFillMandetoryValidation = false;
    this.showDateValidation = false;
  }

  submitQuery() {
    this.showFillMandetoryValidation = false;
    this.showDateValidation = false;
    let fromdate = this.studentReportForm.get('fromDate').value;
    let toDate = this.studentReportForm.get('toDate').value;
    if (fromdate !== undefined && fromdate !== '' && toDate !== undefined && toDate !== '') {
      if (toDate < fromdate) {
        this.showDateValidation = true;
        return;
      }
    }
    if (this.studentReportForm.valid) {
      this.couchingCenterService.getStudentReports(this.studentReportForm.getRawValue()).subscribe(res => {
        this.students = res.json();
        this.totalDues = 0;

        // for (let student of this.students) {
        //   this.totalDues += due.due;
        // }
      });
    } else {
      this.showFillMandetoryValidation = true;
    }
  }

  fetchCounselors() {
    let centerseq = this.studentReportForm.get('centerId').value;
    this.couchingCenterService.getCounselorsForCenter(centerseq).subscribe(response => {

      let date = response.json();
      this.counselors = date.data;
    });

  }

}
