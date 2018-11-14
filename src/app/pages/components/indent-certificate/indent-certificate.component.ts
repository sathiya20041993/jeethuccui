import { StudentService } from './../../student/student.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-indent-certificate',
  templateUrl: './indent-certificate.component.html',
  styleUrls: ['./indent-certificate.component.scss']
})
export class IndentCertificateComponent implements OnInit {

  centerSeq = this._cookieService.get('centerSeq');
  isEditPage = false;
  date = new Date();

  showSuccessResponseNotification = false;
  showFailureResponseNotification = false;
  showFillMandetoryValidation = false;
  responseMessage;

  cities;
  country;

  centerList;
  names;
  students;

  indentCertificateForm: FormGroup;

  studentIndents;

  grades =[{
    label:'PASS',
    value:'PASS'
  },
  {
    label:'MERIT',
    value:'MERIT'
  },
  {
    label:'DISTINCTION',
    value:'DISTINCTION'
  }]

  constructor(private fb: FormBuilder, private _cookieService: CookieService, private _studentService: StudentService,
    private router: Router, private activatedRoute: ActivatedRoute) {

    this.indentCertificateForm = this.getIndentCertificateForm();





  }


  ngOnInit() {

    let userRole = this._cookieService.get('userRole');


  }

  filterName(event) {


    this._studentService.searchStudent(event.query, this.centerSeq).subscribe(res => {
      this.names = res.json();
    });

  }

  getIndentCertificateForm() {
    return this.fb.group({
      batchName: ['', Validators.required],
      studentIndents: this.fb.array([
        this.getNewStudentIndentFormGroup()
      ])


    });
  }




  addnewStudentForIndent() {
    event.stopPropagation();
    this.studentIndents = this.indentCertificateForm.get('studentIndents') as FormArray;
    this.studentIndents.push(this.getNewStudentIndentFormGroup());
  }

  getNewStudentIndentFormGroup() {
    return this.fb.group({
      studentId: ['', Validators.required],
      student: [, Validators.required],
      courseSeq: ['', Validators.required],
      grade: ['', Validators.required],
      certificateNumber:['', Validators.required],
      relatedCourse: []


    });
  }

  removeSelectedCourse(index) {

    this.studentIndents = this.indentCertificateForm.get('studentIndents') as FormArray;
    this.studentIndents.removeAt(index);
  }





  get studentIndentsArray() {
    return this.indentCertificateForm.get('studentIndents') as FormArray;
  }

  selectStudent(event, i) {
    let selectedStudentId = event.studentId;

    this.studentIndentsArray.at(i).get('studentId').setValue(selectedStudentId);

    this._studentService.courseByStudentId(selectedStudentId).subscribe(response => {

      let responseData = response.json();

      if (responseData.code === 200) {
        console.log(responseData.data);
        this.studentIndentsArray.at(i).get('relatedCourse').setValue(responseData.data);
      } else {
        alert("Something Went Wrong");
      }
    });
  }


  getCertificateInfo(formGroupIndex){

    let sid =  this.studentIndentsArray.at(formGroupIndex).get('studentId').value;
    let selectedCourseId =  this.studentIndentsArray.at(formGroupIndex).get('courseSeq').value;
    
   
    this._studentService.courseCertificateInfo(sid ,selectedCourseId ).subscribe(response => {

      let responseData = response.json();

      if (responseData.code === 200) {
        console.log(responseData.data);
        this.studentIndentsArray.at(formGroupIndex).get('certificateNumber').setValue(responseData.data.certificateNumber);
      }
      
      else {
        this.showFailureResponseNotification= true;
        this.responseMessage = responseData.message;
      }
    });

  }

  saveIndents(){
    console.log(this.indentCertificateForm.getRawValue());

    if(this.indentCertificateForm.valid){


      this._studentService.saveStudentIndent(this.indentCertificateForm.getRawValue() ).subscribe(response => {

        let responseData = response.json();
  
        if (responseData.code === 200) {
          this.showSuccessResponseNotification = true;
          this.indentCertificateForm.reset();
          let array = this.indentCertificateForm.get('studentIndents') as FormArray;
          while (array.length !== 1) {
            array.removeAt(0)
          }
        }
        
        else {
          this.showFailureResponseNotification= true;
          this.responseMessage = responseData.message;
        }
      });


    }
    else {
      this.showFillMandetoryValidation = true;
    }
  }
}
