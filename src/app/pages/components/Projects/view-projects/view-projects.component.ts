import { ProjectService } from './../services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent implements OnInit {

 
  selectedCenters;
  pageName = "Centers"
  projectList = [];
  cols: any[];


  constructor(private router: Router ,private _cookieService : CookieService, private projectService: ProjectService) {

    this.projectService.getAllProjects().subscribe(response => {

      let date = response.json();
      this.projectList = date.data;
     
    });

    this.cols = [
      { field: 'projectId', header: 'Project Id' },
      { field: 'projectName', header: 'Project Name' },
      { field: 'description', header: 'Description' },
      { field: 'clientInformation', header: 'Client Information' },
      { field: 'projectAmount', header: 'Total Amount' },
      { field: 'projectPaidAmount', header: 'Paid Amount' },
      { field: 'projectPendingAmount', header: 'Due Amount' },
      { field: 'projectStartDate', header: 'Start Date' },
      { field: 'projectDurationInMonths', header: 'Duration' },

    ];

  }

  ngOnInit() {

    let userRole = this._cookieService.get('userRole');

    if (userRole !== 'ADMIN') {

      this.router.navigateByUrl('login');

    }
  }


  update(projectId) {

    
this.router.navigateByUrl('pages/project/edit/'+projectId);
  }

  payment(projectId) {

    
    this.router.navigateByUrl('pages/project/payment/'+projectId);
      }
}