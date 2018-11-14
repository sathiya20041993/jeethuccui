import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { environment } from './../../../../../environments/environment';



import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { iif } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CouchingCenterService {
  environment;

  constructor(private http: Http , private cookieService : CookieService) { }

  createAuthHeader(headers: Headers) {
    headers.append('userId', this.cookieService.get('userId'));
    headers.append('sessionId', this.cookieService.get('sessionId')); 
  }


  getAllCouchingCenters(): any {
    return this.http.get(environment.url + "couching-center/list");
  }


  saveCouchingCenter(centerData) {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.url + "couching-center/save", centerData, options);
  }


  getCenterDetails(centerId) {

    let headers = new Headers();
    this.createAuthHeader(headers);
    return this.http.get(environment.url + "couching-center/get/" + centerId , {headers: headers});
  }

  checkForExistingUserId(userId){

   return  this.http.get(environment.url +'user/checkDuplicateUserId/'+ userId);

   

   }

   saveCourses(courseData){
     
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(environment.url + "courses/save", courseData, options);
   }


   getCoursesInCenter(centerSeq){
    return this.http.get(environment.url + "courses/getByCenterSeqenceNumber/"+centerSeq);
   }


   updateCourse(course){
    return this.http.post(environment.url + "courses/updateCourse", course);
   }

   checkForDuplicateCenterId(centerId){
    return this.http.get(environment.url + "couching-center/checkDuplicate/" + centerId);
   }

   getBatchesWithPendingCertificate(centerId){
    return this.http.get(environment.url + "couching-center/batches-with-pending-certificate/" + centerId);
   }


   getCounselorsForCenter(centerSeq){
    return this.http.get(environment.url + "couching-center/counselors/" + centerSeq);
   }

   getDues(data) {
    return this.http.post(environment.url + "report/due", data);
   }

   getCollection(data) {
    return this.http.post(environment.url + "report/collection", data);
   }

   getStudentReports(data){
    return this.http.post(environment.url + "report/others/students", data);
   }
  }


