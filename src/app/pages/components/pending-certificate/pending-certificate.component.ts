import { MessageService } from 'primeng/components/common/messageservice';
import { PendingCertificateService } from './pending-certificate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pending-certificate',
  templateUrl: './pending-certificate.component.html',
  styleUrls: ['./pending-certificate.component.scss']
})
export class PendingCertificateComponent implements OnInit {


  centers;
  selectedCenter;
  selectedBatch;
  batches;
  selectedCenters;
  msgs;
  inventesCertificates;


  cols = [
    { field: 'studentName', header: 'Student Name' },
    { field: 'courseName', header: 'Course Name' },
    { field: 'gradeObtained', header: 'Grade' },
    { field: 'certificateNumber', header: 'Certificate Number' },
    {field: 'certificatePrintedYesOrNo', header: 'Certificate Already Printed'}

  ];

  constructor(private pendingCertificateService:PendingCertificateService , private messageService : MessageService) { 

    this.pendingCertificateService.getCentersDropDown().subscribe( response =>
      {
        let responseData = response.json();
        this.centers = responseData.data;
      });


  }

  getCenterBatches(){
    this.pendingCertificateService.getCenterBatches(this.selectedCenter).subscribe( response =>
      {
        let responseData = response.json();
        this.batches = responseData.data;
      });
  }


  getIndententedStudentCourses(){
    this.pendingCertificateService.getIndententedStudentCourses(this.selectedCenter , this.selectedBatch).subscribe( response =>
      {
        let responseData = response.json();
        this.inventesCertificates = responseData.data;
      });
  }

  updateAsPrinted(){
    this.pendingCertificateService.updatePrintedStatus(this.selectedCenter , this.selectedBatch).subscribe( response =>
      {
        this.messageService.add({severity:'success', summary:'Updation success'})
       
      });
  }
  ngOnInit() {
  }

}
