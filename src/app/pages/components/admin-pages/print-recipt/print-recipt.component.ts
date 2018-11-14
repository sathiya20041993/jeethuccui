import { PrintReceiptService } from './print-receipt.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-recipt',
  templateUrl: './print-recipt.component.html',
  styleUrls: ['./print-recipt.component.scss']
})
export class PrintReciptComponent implements OnInit {

  constructor(private printReceiptService: PrintReceiptService) { 



   
  }

  reciptantname = 'Jeetendra';
  paidAmount ='3,200.00';
  courseName= 'MS OFFICE';
  otherCharges='0.00';
  grandTotal='3,200.00';
  postalAddress ='3 rd Floor , Above Pizza Hut, NES Road, Yelehanka New Town, Bangalore - 64';
  date="02/08/2018";
  receiptNo = 'LI50501067'
  ngOnInit() {
  }

   printDiv(divName) {
    this.printReceiptService.printReceipt().subscribe( (response:any) => {
     
      let data=response.json();
      var newWindow = window.open("","","width=900,height=900");
  
      newWindow.document.write(data.data);
      newWindow.document.close();
     });
  
}

}
