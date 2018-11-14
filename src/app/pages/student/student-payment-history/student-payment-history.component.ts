import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-payment-history',
  templateUrl: './student-payment-history.component.html',
  styleUrls: ['./student-payment-history.component.scss']
})
export class StudentPaymentHistoryComponent implements OnInit {


  totalCourseFee =0;
  totalDiscount =0;
  totalAddOn =0;
  totalFee =0;
  totalDue =0;
  totalPaid =0;

  student: any;
  _studentId;

  studentpayHistorys = [];

  cols = [];

  @Input()
  set studentId(studentId) {
    if (studentId != undefined) {
      this._studentId = studentId;

      this._studentService.studentPaymentsList(this._studentId).subscribe(res => {
        let response = res.json();
        if (response.data)
          this.studentpayHistorys = response.data;


          this.totalCourseFee =0;
          this.totalDiscount =0;
          this.totalAddOn =0;
          this.totalFee =0;
          this.totalDue =0;
          this.totalPaid =0;
        
          for (let history of this.studentpayHistorys) {
            
            this.totalCourseFee += history.coursesFee;
            this.totalDiscount+= history.discount;
            this.totalAddOn += history.addon;
            this.totalFee += history.totalFee;
            this.totalDue += history.dueAmount;
            this.totalPaid += history.paidAmount;
          }

        if (response.student)
          this.student = response.student;
      });
    }
  }

  constructor(private _route: ActivatedRoute, private _studentService: StudentService, private _cookieService: CookieService) { }

  ngOnInit() {






    this.cols = [
      { field: 'paymentDate', header: 'Payment Date ' },
      { field: 'coursesFee', header: 'Course Fee ' },
      { field: 'discount', header: 'Discount ' },
      { field: 'addon', header: 'Addon ' },
      { field: 'totalFee', header: 'Total Fee ' },
      { field: 'dueAmount', header: 'Due ' },
      { field: 'paidAmount', header: 'Paid ' }
    ];
  }

  back() {
    window.history.back();
  }

  printInvoice(rowData) {
    console.log(rowData);
    let paidAmt = rowData.paidAmount;
    let paymentDate = rowData.paymentDate;
    let centerSeq = this._cookieService.get('centerSeq');
    let userSeq = this._cookieService.get('userSeq');

    // print - TODO - open in new tab
    let data = {
      reciptantname: this.student.studentName,
      paidAmount: paidAmt,
      courseName: '',
      otherCharges: 0,
      grandTotal: 0,
      postalAddress: '',
      date: this.convertDate(paymentDate),
      receiptNo: '',
      centerSeq: centerSeq,
      studentId: this.student.studentId,
      userSeq: userSeq
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
  }

  convertDate(dateString) {
    var p = dateString.split(/\D/g)
    return [p[2], p[1], p[0]].join("/")
  }

}
