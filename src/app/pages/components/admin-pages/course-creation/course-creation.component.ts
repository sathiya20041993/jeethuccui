import { CookieService } from 'ngx-cookie-service';
import { CouchingCenterService } from './../services/couching-center.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-creation',
  templateUrl: './course-creation.component.html',
  styleUrls: ['./course-creation.component.scss']
})
export class CourseCreationComponent implements OnInit {

  centerSeq;
  isEditPage = false;

  showSuccessResponseNotification = false;
  showFailureResponseNotification = false;
  showFillMandetoryValidation = false;
  responseMessage;

  cities;
  country;

  centerList;

  courseCreationForm: FormGroup;
  courses;

  constructor(private couchingCenterService: CouchingCenterService, private fb: FormBuilder, private _cookieService: CookieService,
    private router: Router, private activatedRoute: ActivatedRoute) {

    this.courseCreationForm = this.getCourseCreationFormForm();
    this.couchingCenterService.getAllCouchingCenters().subscribe(response => {

      let date = response.json();
      this.centerList = date.data;
      console.log(this.centerList);
    });

    if (this.activatedRoute.snapshot.params.centerSeq) {
      this.isEditPage = true;
      this.centerSeq = this.activatedRoute.snapshot.params.centerSeq;
      this.getCoursesForCenter();
    }


  }


  ngOnInit() {

    let userRole = this._cookieService.get('userRole');

    if (userRole !== 'ADMIN') {

      this.router.navigateByUrl('login');

    }
  }

  getCourseCreationFormForm() {
    return this.fb.group({
      centerDto: [],
      courses: this.fb.array([
        this.getNewCourseFormGroup()
      ])


    });
  }


  get coursesFormArray() {
    return this.courseCreationForm.get('courses') as FormArray;
  }

  addnewCourseInArray() {
    event.stopPropagation();
    this.courses = this.courseCreationForm.get('courses') as FormArray;
    this.courses.push(this.getNewCourseFormGroup());
  }

  getNewCourseFormGroup() {
    return this.fb.group({
      courseSeq: [],
      courseName: ['', Validators.required],
      certificateSeriesPrefix: ['', Validators.required],
      fees: ['', Validators.required],
      isEbookAvailable: [false],
      fileName: [''],
      isActive: [true]

    });
  }

  removeSelectedCourse(index) {

    this.courses = this.courseCreationForm.get('courses') as FormArray;
    this.courses.removeAt(index);
  }

  saveCourses() {

    if (this.courseCreationForm.valid) {
      console.log(this.courseCreationForm.getRawValue());


      this.couchingCenterService.saveCourses(this.courseCreationForm.getRawValue()).subscribe(response => {
        const data = response.json();

        if (data.code == 200) {
          this.courseCreationForm.reset();
          this.showSuccessResponseNotification = true;

          setTimeout(() => {    //<<<---    using ()=> syntax
            this.router.navigateByUrl("pages/center/view");
          }, 2000);

        }
        if (data.code == 410) {
          this.showFailureResponseNotification = true;
          this.responseMessage = data.message;
        }
        if (data.code == 415) {
          this.showFailureResponseNotification = true;
          this.responseMessage = data.message;
        }

      });
    } else {
      this.showFillMandetoryValidation = true;
      setTimeout(() => {    //<<<---    using ()=> syntax
        this.showFillMandetoryValidation = false;
      }, 3000);
    }
  }


  getCoursesForCenter() {
  
   if(!this.isEditPage){
    let center = this.courseCreationForm.get('centerDto').value;
    this.centerSeq = center.centerSeq;
    
   }
    this.couchingCenterService.getCoursesInCenter(this.centerSeq).subscribe(response => {
      let resp = response.json();

      this.courseCreationForm.patchValue(resp.data);

      let councelors = <FormArray>this.courseCreationForm.controls['courses'];

      councelors.removeAt(0);

      let coursesFromResponse: any[] = resp.data.courses;

      if (coursesFromResponse != undefined) {

        for (let i = 0; i < coursesFromResponse.length; i++) {
          councelors.push(this.convertCoursesDtoToFormArray(coursesFromResponse[i]));
        }


      }

    });
  }

  convertCoursesDtoToFormArray(course) {

    return this.fb.group({


      courseSeq: [course.courseSeq],
      courseName: [course.courseName, Validators.required],
      fees: [course.fees, Validators.required],
      certificateSeriesPrefix: [course.certificateSeriesPrefix, Validators.required],
      isActive: [course.isActive],
      isEbookAvailable: [course.isEbookAvailable],
      fileName: [course.fileName]
    });
  }
  onHideNotification(){
    this.showSuccessResponseNotification = false;
    this.showFailureResponseNotification = false;
    this.showFillMandetoryValidation = false;
  }
}