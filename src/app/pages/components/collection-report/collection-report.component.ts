import { CookieService } from 'ngx-cookie-service';
import { CouchingCenterService } from './../admin-pages/services/couching-center.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-collection-report',
  templateUrl: './collection-report.component.html',
  styleUrls: ['./collection-report.component.scss']
})
export class CollectionReportComponent implements OnInit {

  showFillMandetoryValidation = false;

  centers=[];

  counselors=[];

  cols= [];

  collections = [];

  dueReportForm: FormGroup;
  userRole;

  totalcollections = 0;
  showDateValidation = false;
  

  constructor(private _formBuilder: FormBuilder, private couchingCenterService: CouchingCenterService, private _cookieService: CookieService) { }

  ngOnInit() {

    this.cols = [
      { field: 'center', header: 'Center ' },
      { field: 'counselor', header: 'Counselor ' },
     
      { field: 'paymentDate', header: 'Date ' },
      { field: 'collection', header: 'Collection Amount ' }    ];
    
    this.userRole = this._cookieService.get('userRole');

    this.dueReportForm = this._formBuilder.group({
      centerId : [, Validators.required],
      counselorId: [],
      fromDate: [],
      toDate: []
    });

    if (this.userRole === 'ADMIN') {
      this.couchingCenterService.getAllCouchingCenters().subscribe(response => {

        let date = response.json();
        let lvPair = [];
        for (let obj of date.data) {
          lvPair.push({label: obj.centerId , value: obj.centerSeq});
        }
        this.centers = lvPair;
      });

    } else if (this.userRole === 'CENTER HEAD' || this.userRole === 'CENTER%20HEAD') {
      console.log('Im center head');
      this.dueReportForm.get('centerId').setValue(this._cookieService.get('centerSeq'));
      this.fetchCounselors();
    } else if (this.userRole === 'COUNSELOR') {
      this.dueReportForm.get('centerId').setValue(this._cookieService.get('centerSeq'));
      this.dueReportForm.get('counselorId').setValue(this._cookieService.get('userSeq'));
    }

  }

  onHideNotification() {
    this.showFillMandetoryValidation = false;
    this.showDateValidation = false;
  }

  submitQuery() {
    this.showFillMandetoryValidation = false;
    this.showDateValidation = false;
    let fromdate = this.dueReportForm.get('fromDate').value;
    let toDate = this.dueReportForm.get('toDate').value;
    if (fromdate !== undefined && fromdate !== '' && toDate !== undefined && toDate !== '') {
      if (toDate < fromdate) {
        this.showDateValidation = true;
        return;
      }
    }
    if (this.dueReportForm.valid) {
      this.couchingCenterService.getCollection(this.dueReportForm.getRawValue()).subscribe(res => {
        this.collections = res.json();
        this.totalcollections = 0;
        
        for (let collection of this.collections) {
          this.totalcollections += collection.collection;
        }
      });
    } else {
      this.showFillMandetoryValidation = true;
    }
  }

  fetchCounselors(){
let centerseq = this.dueReportForm.get('centerId').value;
    this.couchingCenterService.getCounselorsForCenter(centerseq).subscribe(response => {

      let date = response.json();
      this.counselors = date.data;
    });

  }


}
