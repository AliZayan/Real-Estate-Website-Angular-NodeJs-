import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginEmployeeService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    // headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = { headers: headers };
    // headers
    let obj = {
      email,
      password,
      'user_type_id': 3
    }
    return this.http.post('http://localhost:5000/token/login',obj, options)
  }
}