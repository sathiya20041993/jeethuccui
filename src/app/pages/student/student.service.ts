import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: Http) { }

    studentsList(centerSeq) {
        return this.http.get(environment.url + "student");
    }

    studentsListByCenterSeq(centerSeq){
        return this.http.get(environment.url + "student/byCenterSeq/"+ centerSeq);
    }

    studentPaymentsList(studentId) {
        return this.http.get(environment.url + "student/payments/" + studentId);
    }

    studentPayment(studentId) {
        return this.http.get(environment.url + "student/payment/" + studentId);
    }

    searchStudent(key: string, centerId) {
        return this.http.get(environment.url + "student/search/" + key + "/" + centerId);
    }

    courseByCenterId(centerId) {
        return this.http.get(environment.url + "courses/active/" + centerId);
    }

    saveStudent(formData: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.url + "student", formData, options);
    }

    saveStudentPayment(formData: any) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(environment.url + "student/payment", formData, options);
    }

    invoice(data: any) {
        return this.http.post(environment.url + "invoice", data);
    }


    courseByStudentId(studentId) {
        return this.http.get(environment.url + "student/courses/" + studentId);
    }

    courseCertificateInfo(studentId, courseId) {
        return this.http.get(environment.url + "student/coursesCertificateInfo/" + studentId + "/" + courseId);
    }

    saveStudentIndent(studentIndentData) {
        return this.http.post(environment.url + "student/indentStudent", studentIndentData)
    }
}