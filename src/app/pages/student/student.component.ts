import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  filteredNames: any[];
  studentForm: FormGroup;
  showStudentId = false;
  displayReceipt = false;
  amountValidation = false;
  showEmailValidation = false;
  showSaving = false;
  showFillMandetoryValidation = false;
  amountValidationMessage = '';

  userSeq = this._cookieService.get('userSeq')

  names = [];

  courses = [];

  coursesObj = [];

  selectedCourse = [];

  centerSeq = this._cookieService.get('centerSeq');
  //centerSeq = 1;

  studentId = 0;

  constructor(private _formBuilder: FormBuilder, private _cookieService: CookieService,
    private _router: Router, private _studentService: StudentService) { }

  ngOnInit() {
    this.studentForm = this._formBuilder.group({
      studentId: [],
      studentCode: [],
      studentNameTmp: [],
      studentName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      joinDate: [],
      course: [, Validators.required],
      centerId: [],
      userSeq: [],
      paymentDetails: this._formBuilder.group({
        coursesFee: [, Validators.required],
        discount: [],
        addon: [],
        totalFee: [, Validators.required],
        paidAmount: [, Validators.required],
        dueAmount: []
      })
    });

    this._studentService.courseByCenterId(this.centerSeq).subscribe(res => {
      let response = res.json();
      let courses = response.data.courses;
      for (let course of courses) {
        this.coursesObj.push(course);
        this.courses.push({ 'label': course.courseName + " - Rs. " + course.fees, 'value': course.courseSeq });
      }
    });
  }

  courseChange(event) {
    this.selectedCourse = [];
    this.studentForm.get('paymentDetails').get('coursesFee').setValue(0);
    for (let val of event.value) {
      for (let course of this.coursesObj) {
        if (course.courseSeq == val) {
          this.studentForm.get('paymentDetails').get('coursesFee')
            .setValue(this.studentForm.get('paymentDetails').get('coursesFee').value
              + course.fees);
          this.selectedCourse.push(course.courseName);
        }
      }
    }
    this.calcTotalFee();
   // this.calcDueFee();
  }

  filterName(event) {
    this.unSelectStudent();
    this.studentForm.get('studentName').setValue(event.query);
    this._studentService.searchStudent(event.query, this.centerSeq).subscribe(res => {
      this.names = res.json();
    });
  }

  selectStudent(value) {
    this.studentForm.get('studentId').setValue(value.studentId);
    this.studentForm.get('studentCode').setValue(value.studentCode);
    this.studentForm.get('studentName').setValue(value.studentName);
    this.studentForm.get('email').setValue(value.email);
    this.studentForm.get('phoneNumber').setValue(value.phoneNumber);
    this.studentForm.get('joinDate').setValue(value.joinDate);
  }

  unSelectStudent() {
    this.studentForm.get('studentId').setValue('');
    this.studentForm.get('studentCode').setValue('');
    this.studentForm.get('studentName').setValue('');
    this.studentForm.get('email').setValue('');
    this.studentForm.get('phoneNumber').setValue('');
    this.studentForm.get('joinDate').setValue('')
  }

  onHideNotification() {
    this.showFillMandetoryValidation = false;
    this.amountValidation = false;
    this.showEmailValidation = false;
    this.amountValidationMessage = '';
  }

  admit() {
    this.showFillMandetoryValidation = false;
    if (!this.studentForm.valid) {
      this.showFillMandetoryValidation = true;
      return;
    }


    let totalFee = Number(this.studentForm.get('paymentDetails').get('totalFee').value);
    let coursesFee = Number(this.studentForm.get('paymentDetails').get('coursesFee').value);
    let addOn = Number(this.studentForm.get('paymentDetails').get('addon').value);
    let discount = Number(this.studentForm.get('paymentDetails').get('discount').value);
    let paidAmount = Number(this.studentForm.get('paymentDetails').get('paidAmount').value)
    if (discount !== undefined) {
      if (discount > coursesFee || discount > totalFee) {
        this.amountValidation = true;
        this.amountValidationMessage = "Discount Amount should be less then course fee and total amount";
        return;
      }
      if (paidAmount > totalFee) {
        this.amountValidation = true;
        this.amountValidationMessage = "Paid Amount should not be greater then total amount";
        return;
      }
    }

    let email = this.studentForm.get('email').value;

    if (!this.ValidateEmail(email)) {
      this.amountValidation = true;
      this.amountValidationMessage = "Invalid Email";
      return;
    }

    this.studentForm.get('userSeq').setValue(this.userSeq);
    this.studentForm.get('centerId').setValue(this.centerSeq);
    let fromData = this.studentForm.getRawValue();
    console.log(this._cookieService.get('logged-user'))
    console.log(fromData)
    this.showSaving = true;
    this._studentService.saveStudent(fromData).subscribe(res => {
      let data = res.json();
      this.studentId = data.studentId;
      let studentCode = data.studentCode;
      this.showSaving = false;
      this.showStudentId = true;
      this.studentForm.get('studentCode').setValue(studentCode);
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

  calcTotalFee() {
    let totalFee = 0;
    totalFee = (Number(this.studentForm.get('paymentDetails').get('coursesFee').value) + Number(this.studentForm.get('paymentDetails').get('addon').value))
      - Number(this.studentForm.get('paymentDetails').get('discount').value);
    this.studentForm.get('paymentDetails').get('totalFee').setValue(totalFee);

    this.calcDueFee();
  }

  calcDueFee() {
    let dueFee = 0;
    dueFee = Number(this.studentForm.get('paymentDetails').get('totalFee').value) - Number(this.studentForm.get('paymentDetails').get('paidAmount').value);
    this.studentForm.get('paymentDetails').get('dueAmount').setValue(dueFee);
  }

  viewList() {
    this._router.navigateByUrl("pages/student/list");
  }

  printInvoice() {
    // print - TODO - open in new tab
    let data = {
      reciptantname: this.studentForm.get('studentName').value,
      paidAmount: this.studentForm.get('paymentDetails').get('paidAmount').value,
      courseName: this.selectedCourse.toString(),
      otherCharges: this.studentForm.get('paymentDetails').get('addon').value ? this.studentForm.get('paymentDetails').get('addon').value : 0,
      grandTotal: this.studentForm.get('paymentDetails').get('totalFee').value,
      postalAddress: '',
      date: this.currentDate(),
      receiptNo: '',
      centerSeq: this.centerSeq,
      studentId: this.studentId,
      userSeq: this.userSeq
    };
    var win = window.open("", "", "width=900,height=900");
    this._studentService.invoice(data).subscribe(res => {
      if (win) {
        //Browser has allowed it to be opened
        // win.focus();
        // win.document.write(res.text());

        win.document.write(res.text());
        win.document.close();

      } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
      }
    });
    this.displayReceipt = false;
    this._router.navigateByUrl("pages/student/list");
  }


  ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return (true)
    }
    
    return (false)
  }
}
