import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('admin-accessToken');

  register(text: string ):Observable<any> {
    // HTTP Req

    console.log('text :: ', text);




// headers
let headers = new HttpHeaders({
  'Authorization': this.token
});
let options = { headers: headers };

    return this.http.post('http://localhost:5000/ContacUsReportReportRouter/MakecontactusReport', {

      text,

    },options)
  }
}
