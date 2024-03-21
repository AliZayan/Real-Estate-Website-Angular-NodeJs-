import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  user_type_id
  constructor(private http: HttpClient,private router: Router) { 

  }
  forgetPassword(email): Observable<any> {
    if(this.router.url.includes('/ForgetPasswordB')){
      this.user_type_id = 2;
    }else if(this.router.url.includes('/ForgetPasswordS')){
      this.user_type_id = 1;
    }else if(this.router.url.includes('/ForgetPasswordC')){
      this.user_type_id = 4;
    }else{
      this.user_type_id = 3;
    }
    // headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // headers
    let emailobj = {
      "email": email,
      "user_type_id":this.user_type_id
    }
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/token/forgetPassword', emailobj, options)
  }
  resetPassword(pass1, pass2,token): Observable<any> {
    // headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token
    });
    // headers
    let passwordsobj = {
      "password": pass1,
      "confirmPassword": pass2
    }
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/token/resetPassword', passwordsobj, options)

  }
}
