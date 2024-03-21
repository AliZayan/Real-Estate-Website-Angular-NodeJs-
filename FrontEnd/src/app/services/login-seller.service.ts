import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginSellerService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const user_type_id = 1
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