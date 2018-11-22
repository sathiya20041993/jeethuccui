import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-payment',
  templateUrl: './project-payment.component.html',
  styleUrls: ['./project-payment.component.scss']
})
export class ProjectPaymentComponent implements OnInit {

  totalAmount;
  dueAmount;
  projectId;
  receivedAmount;
  totalPaidAmount;
  showFillMandetoryValidation = false;
  payments = [];
  validationMessage;
  responseMessage;
  showresponseResponseNotification;
  displayConfirmation = false;
  constructor(private _cookieService : CookieService ,private messageService: MessageService, private fb: FormBuilder, 
    private router: Router, private projectService: ProjectService, private activatedRoute: ActivatedRoute) {

    

      if (this.activatedRoute.snapshot.params.projectId) {
       
        this.projectId = this.activatedRoute.snapshot.params.projectId;
        this.getProjectInfo( this.projectId );
      
      }
     }

  ngOnInit() {
  }

  
  getProjectInfo(projectId){
    const requestInfo = {
     projectId : projectId
    }
 debugger;
     this.projectService.getProjectInfo(requestInfo).subscribe(response => {
       const data = response.json();
 
       if (data.code == 200) {
         let res = response.json();
       console.log(res);

       this.totalAmount = res.data.projectAmount;
       this.dueAmount = res.data.projectPendingAmount;
       this.totalPaidAmount = res.data.projectPaidAmount;
       this.payments =  res.data.payments;
       }
       if (data.code == 410) {
        
       }
     });
   }
   
   receiveAmount(){

    let amountreceived =  this.receivedAmount;

    if(amountreceived === undefined || amountreceived === null || amountreceived===''){
      this.showFillMandetoryValidation = true;
      this.validationMessage ='Amount is required';
      return;
    }
    let amountreceivedInNumber =  Number(this.receivedAmount);
  
    if(amountreceivedInNumber > this.dueAmount){
      this.showFillMandetoryValidation = true;
      this.validationMessage ='Amount should be less then due amount';
      return;
    }
    this.displayConfirmation = true;
   

   }


   continuePayment(){
     this.displayConfirmation= false;
    const requestInfo = {
      projectId : this.projectId,
      receivedAmount : this.receivedAmount
     }
    this.projectService.receivePayment(requestInfo).subscribe(response => {
      const data = response.json();

      if (data.code == 200) {
        let res = response.json();
        this.showresponseResponseNotification = true;
        this.responseMessage = "Success";
     
        setTimeout(() => {    //<<<---    using ()=> syntax
          this.router.navigateByUrl("pages/projects/view");
        }, 2000);

     
      }
      if (data.code == 410) {
       
      }
    });
   }

}
