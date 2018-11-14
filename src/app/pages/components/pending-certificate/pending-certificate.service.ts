import { environment } from './../../../../environments/environment';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PendingCertificateService {

  environment
constructor(private http: Http) { }


getCentersDropDown(){
 return this.http.get(environment.url +'couching-center/labelValue');
}

getCenterBatches(center){
  return this.http.get(environment.url +'studentCourses/batches/'+ center);
}

getIndententedStudentCourses(center, batch){
  return this.http.get(environment.url +'studentCourses/batches/'+ center + '/'+ batch);
}

updatePrintedStatus(center, batch){
  return this.http.get(environment.url +'studentCourses/update-printed/'+ center + '/'+ batch);
}
}
