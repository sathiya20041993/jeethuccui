import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/components/common/messageservice';
import { CouchingCenterService } from './../services/couching-center.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-create-center',
  templateUrl: './create-center.component.html',
  styleUrls: ['./create-center.component.css']
})
export class CreateCenterComponent implements OnInit {

  action = "Create ";
  pageName = "Center";
  isCenterHead = false;
  responseMessage;

  selectedFile: File;

  couchingCenterForm: FormGroup;
  counselorform: FormGroup;
  showFailureResponseNotification = false;
  showSuccessResponseNotification = false;
  showSuccessResponseOnCourseUpdate = false;
  showFailureResponseOnCourseUpdate = false;
  showCenterDuplicateError = false;

  counselors;
  courses;
  postalAddress;
  centerId;
  phone;
  isEditPage = false;
  msgs;
  showFillMandetoryValidation = false;

  showCounselorCreationPopup = false;

  councellorForm: FormArray;
  constructor(private _cookieService : CookieService ,private messageService: MessageService, private fb: FormBuilder, private router: Router, private couchingCenterService: CouchingCenterService, private activatedRoute: ActivatedRoute) {

    if (this.activatedRoute.snapshot.params.centerId) {
      this.isEditPage = true;
      this.centerId = this.activatedRoute.snapshot.params.centerId;
      this.getCenterDetails();
    }



  }

  ngOnInit() {


    let userRole = this._cookieService.get('userRole');

    if (userRole !== 'ADMIN') {

      this.router.navigateByUrl('login');

    }

    this.couchingCenterForm = this.getcouchingCenterForm();
    this.counselorform = this.getCouncellorForm();

  }

  get councellorFormArray() {
    return <FormArray>this.couchingCenterForm.get('councellors');
  }

  createCounselorPopUp() {
    this.showCounselorCreationPopup = true;
  }


  getcouchingCenterForm() {
    return this.fb.group({
      centerSeq: [],
      centerId: ['', Validators.required],
      phone: ['', Validators.required],
      postalAddress: ['', Validators.required],
      councellors: this.fb.array([

      ])

    });
  }


  getCouncellorForm() {
    return this.fb.group({
      userSeq: [],
      userName: ['', Validators.required],
      userId: ['', [Validators.required]],
      password: ['', Validators.required],
      isCenterHead: [false],
      isActive: [true],
      userRoles: []

    });
  }



  removeSelectedCounselor(i) {

    this.counselors = this.couchingCenterForm.get('councellors') as FormArray;
    this.counselors.removeAt(i);

  }

  addNewCouncelor() {
    event.stopPropagation();
    this.counselors = this.couchingCenterForm.get('councellors') as FormArray;
    this.counselors.push(this.getCouncellorForm());
  }




  saveCouchingCenter() {


    if (this.couchingCenterForm.valid) {
      let formData = this.couchingCenterForm.getRawValue();
      console.log(formData);


      this.couchingCenterService.saveCouchingCenter(formData).subscribe(response => {
        const data = response.json();

        if (data.code == 200) {
          this.couchingCenterForm.reset();
          this.showSuccessResponseNotification = true;

          setTimeout(() => {    //<<<---    using ()=> syntax
            this.router.navigateByUrl("pages/center/view");
          }, 2000);

        }
        if (data.code == 410) {
          this.showFailureResponseNotification = true;
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



  getCenterDetails() {

    this.couchingCenterService.getCenterDetails(this.centerId).subscribe(response => {
      let res = response.json();
      this.couchingCenterForm.patchValue(res.data);

      this.courses = res.data.coursesDto;
      let councelors = <FormArray>this.couchingCenterForm.controls['councellors'];

      if (res.data !== undefined) {

        let councelorsFromResponse: any[] = res.data.councellors;

        if (councelorsFromResponse != undefined) {

          for (let i = 0; i < councelorsFromResponse.length; i++) {
            councelors.push(this.convertCouncelorDtoToFormArray(councelorsFromResponse[i]));
          }


        }
      }

      // councelors.push(this.convertCouncelorDtoToFormArray());



    });

  }


  validateUserId(control: AbstractControl) {
    if (control.value !== '') {
      return this.couchingCenterService.checkForExistingUserId(control.value).subscribe(response => {
        let res = response.json();

        return res.data ? null : { userIdExist: true };

      });
    }
  }

  convertCouncelorDtoToFormArray(counselr) {


    return this.fb.group({
      userSeq: [counselr.userSeq],
      userName: [counselr.userName, Validators.required],
      userId: [counselr.userId, Validators.required],
      password: [counselr.password, Validators.required],
      isCenterHead: [counselr.isCenterHead],
      isActive: [counselr.isActive],
      userRoles: [counselr.userRoles]
    });
  }

  onHideNotification() {
    this.showFailureResponseNotification = false;
  }

  updateCenterCourses() {

    let centerSeq = this.couchingCenterForm.controls['centerSeq'].value;
    this.router.navigateByUrl('pages/courses/update/' + centerSeq);
  }


  updateCourse(course) {
    debugger;

    this.couchingCenterService.updateCourse(course).subscribe(response => {
      const data = response.json();

      if (data.code == 200) {

        this.showSuccessResponseOnCourseUpdate = true;

        setTimeout(() => {    //<<<---    using ()=> syntax
          this.showSuccessResponseOnCourseUpdate = false;
        }, 2000);

      }
      if (data.code == 410) {
        this.showFailureResponseOnCourseUpdate = true;
        this.responseMessage = data.message;

        setTimeout(() => {    //<<<---    using ()=> syntax
          this.showFailureResponseOnCourseUpdate = false;
        }, 3000);
      }
    });
  }


  checkCenterAlreadyExistWhileCreation() {
debugger;
    if (!this.isEditPage) {

      let newCenterId =  this.couchingCenterForm.controls['centerId'].value;
      this.couchingCenterService.checkForDuplicateCenterId(newCenterId).subscribe(response => {
        let res = response.json();
        debugger;
        if (res.code === 200) {
          this.responseMessage = res.message;
          this.showCenterDuplicateError = true;
          this.couchingCenterForm.controls['centerId'].setValue('');
          setTimeout(() => {    //<<<---    using ()=> syntax
            this.showCenterDuplicateError = false;
          }, 3000);
        }

       



      });
    }

  }
}
