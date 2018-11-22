import { ProjectService } from './../services/project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  showresponseResponseNotification = false;
  showFillMandetoryValidation = false;
  responseMessage;
  projectForm: FormGroup;
  isEditPage;
  projectId;
  startDate = new Date();
  title= 'Add';
  constructor(private _cookieService : CookieService ,private messageService: MessageService, private fb: FormBuilder, private router: Router, private projectService: ProjectService, private activatedRoute: ActivatedRoute) {

    this.projectForm = this.getcouchingCenterForm();

    if (this.activatedRoute.snapshot.params.projectId) {
      this.isEditPage = true;
      this.projectId = this.activatedRoute.snapshot.params.projectId;
      this.getProjectInfo( this.projectId );
     this. title = 'Edit'
    }
   }

  ngOnInit() {
  }




  getcouchingCenterForm() {
    return this.fb.group({
      projectId: [],
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      clientInformation: ['', Validators.required],
      projectAmount: [, Validators.required],
      projectPaidAmount: [0],
      projectPendingAmount: [],
      projectStartDate: [],
      projectDurationInMonths: [],
      startDate:[]
     

    });
  }


  
  saveProject() {


    if (this.projectForm.valid) {
debugger;
      const selectedDate =  this.projectForm.get('startDate').value;
      this.projectForm.get('projectStartDate').setValue( selectedDate);
      let formData = this.projectForm.getRawValue();
      console.log(formData);

     
      this.projectService.saveProject(formData).subscribe(response => {
        const data = response.json();

        if (data.code == 200) {
          this.showresponseResponseNotification = true;
          this.responseMessage = data.message;

          setTimeout(() => {    //<<<---    using ()=> syntax
            this.router.navigateByUrl("pages/projects/view");
          }, 2000);
  

        }
        if (data.code == 410) {
          this.showresponseResponseNotification = true;
          this.responseMessage = data.message;
        }
      });
    }
    else {
      this.showFillMandetoryValidation = true;
      setTimeout(() => {    //<<<---    using ()=> syntax
        this.showFillMandetoryValidation = false;
      }, 3000);
    }

  }


  getProjectInfo(projectId){
   const requestInfo = {
    projectId : projectId
   }

    this.projectService.getProjectInfo(requestInfo).subscribe(response => {
      const data = response.json();

      if (data.code == 200) {
        let res = response.json();
         this.getDate(res.data.projectStartDate);
        this.projectForm.patchValue(res.data);
      }
      if (data.code == 410) {
        this.showresponseResponseNotification = true;
        this.responseMessage = data.message;
      }
    });
  }
  
  getDate(date){
    if(date !== null){
      this.projectForm.get('startDate').setValue(new Date(date)) ;
    }
  }


  addPayment() {

    this.router.navigateByUrl('pages/project/payment/'+this.projectId);
       }
  
}
