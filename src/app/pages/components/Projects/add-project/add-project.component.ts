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


  projectForm: FormGroup;
  constructor(private _cookieService : CookieService ,private messageService: MessageService, private fb: FormBuilder, private router: Router, private projectService: ProjectService, private activatedRoute: ActivatedRoute) {

    this.projectForm = this.getcouchingCenterForm();
   }

  ngOnInit() {
  }




  getcouchingCenterForm() {
    return this.fb.group({
      projectId: [],
      projectName: ['', Validators.required],
      description: ['', Validators.required],
      clientInformation: ['', Validators.required],
      projectAmount: [],
      projectPaidAmount: [],
      projectPendingAmount: [],
      projectStartDate: [],
      projectDurationInMonths: []
     

    });
  }
}
