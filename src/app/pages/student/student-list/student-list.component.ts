import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any[];
  cols: any[];
  constructor(private _router: Router, private _studentService: StudentService, private cookieService : CookieService) { }

  ngOnInit() {

    this.students = [];
    this._studentService.studentsListByCenterSeq(this.cookieService.get('centerSeq')).subscribe(res => {
      this.students = res.json();
    });

    
    this.cols = [
      { field: 'studentCode', header: 'Student Id' },
      { field: 'studentName', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phoneNumber', header: 'Phone' },
      { field: 'joinDate', header: 'Joined On' },
      { field: 'course', header: 'Course' },
    ];
  }

  admitStudent() {
    this._router.navigateByUrl("pages/student");
  }

}
