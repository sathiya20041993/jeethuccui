import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintReceiptService {

  constructor(private http: Http) { }


  printReceipt(){
    const options = { responseType: ResponseContentType.Blob  };
    return  this.http.get("http://localhost:8080/test/getHtml");
 
    
 
    }

}
