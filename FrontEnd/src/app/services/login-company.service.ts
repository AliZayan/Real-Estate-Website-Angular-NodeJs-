import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCompanyService {
  constructor(private http: HttpClient) {}
  addEmpURL : string;
  getEmpURL : string;
  login(email: string, password: string): Observable<any> {
    let user_type_id= 4

    // headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    // headers
    return this.http.post('http://localhost:5000/token/login', {
      email,
      password,
      user_type_id
    }, options)
  }


}
