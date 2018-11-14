import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.scss']
})
export class StudentPaymentComponent implements OnInit {

  showFillMandetoryValidation = false;
  showPaid = false;
  feePaymentForm: FormGroup;

  showPrint = false;
  showAmountValidation = false;

  _studentId;
  studentCode;

  centerSeq = this._cookieService.get('centerSeq');
  userSeq = this._cookieService.get('userSeq');
  //centerSeq = 1;

  names = [];

  selectedStudent : any;

  saveMessage = 'Pending';


  constructor(private _router: Router, private _formBuilder: FormBuilder, private _studentService: StudentService, private _cookieService: CookieService) { }

  ngOnInit() {
    this.feePaymentForm = this._formBuilder.group({
      studentNameTmp: [, Validators.required],
      totalFee: [, Validators.required],
      dueAmount: [, Validators.required],
      paidAmount: [, Validators.required],
      studentId: [],
      studentCode: [],
      userSeq:[]

    });
  }

  selectStudent(event) {
    this._studentService.studentPayment(event.studentId).subscribe(res => {
      let response = res.json();
      if (response.data) {
        this.feePaymentForm.get('totalFee').setValue(response.data.totalFee);
        this.feePaymentForm.get('dueAmount').setValue(response.data.dueAmount);
        this.selectedStudent = event;
        this.studentCode = response.studentCode;
      }
    });
    this.feePaymentForm.get('studentId').setValue(event.studentId);

    this.viewHistory();
  }

  unSelectStudent() {
    this.selectedStudent = {};
    this.feePaymentForm.get('studentId').setValue('');
    this.feePaymentForm.get('totalFee').setValue('');
    this.feePaymentForm.get('dueAmount').setValue('');
  }

  filterName(event) {
    this.unSelectStudent();
    this._studentService.searchStudent(event.query, this.centerSeq).subscribe(res => {
      this.names = res.json();
      if (this.names.length == 0) {
        this.feePaymentForm.get('studentNameTmp').setValue('');
      }
    });
  }

  onHideNotification() {
    this.showFillMandetoryValidation = false;
    this.showAmountValidation = false;
  }

  payFee() {
    if (!this.feePaymentForm.valid) {
      this.showFillMandetoryValidation = true;
      return;
    }

    let  dueAmount= Number(this.feePaymentForm.get('dueAmount').value);
    let pidAmount =  Number(this.feePaymentForm.get('paidAmount').value);

    if(dueAmount < pidAmount){
      this.showAmountValidation = true;
      return;
    }
    this.showPaid = true;

  }



  proceedPayment() {

    this.feePaymentForm.get('userSeq').setValue(this.userSeq);
    this._studentService.saveStudentPayment(this.feePaymentForm.getRawValue()).subscribe(res => {
      this.saveMessage = res.text();
      this.showPaid=false;
      this.showPrint=true;
      //this._router.navigateByUrl("pages/student/list");
    });
  }

  viewHistory() {

    this._studentId = this.feePaymentForm.get('studentId').value;
    //this._router.navigateByUrl("pages/student/pay/history/" + this.feePaymentForm.get('studentId').value);
  }

  
  printInvoice() {

    this.showPrint = false;
    // print - TODO - open in new tab
    let data = {
      reciptantname: this.selectedStudent.studentName,
      paidAmount: this.feePaymentForm.get('paidAmount').value,
      courseName: '',
      otherCharges: 0,
      grandTotal: this.feePaymentForm.get('totalFee').value,
      postalAddress: '',
      date: this.currentDate(),
      receiptNo: '',
      centerSeq: this.centerSeq,
      studentId: this.selectedStudent.studentId,
      userSeq: this.userSeq
    };
    var win = window.open("","","width=900,height=900");
    this._studentService.invoice(data).subscribe(res => {
      if (win) {
        //Browser has allowed it to be opened
        // win.focus();
        // win.document.write(res.text());

        this.showPaid = false;
        this.feePaymentForm.reset();
        win.document.write(res.text());
        win.document.close();
        this._router.navigateByUrl("pages/student/list");

      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    });
  }

  currentDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let ddr;
    let mmr;
    let yyyy = today.getFullYear();
    if (dd < 10)
      ddr = '0' + dd;
    else
      ddr = '' + dd;

    if (mm < 10)
      mmr = '0' + mm;
    else
      mmr = '' + mm;

    return ddr + '/' + mmr + '/' + yyyy;
  }

}
