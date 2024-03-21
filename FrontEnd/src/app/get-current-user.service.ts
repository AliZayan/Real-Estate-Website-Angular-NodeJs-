import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GetCurrentUserService {

  constructor(private http: HttpClient) { }
  token = localStorage.getItem('admin-accessToken');

  // headers
  getPropertyStatus(): Observable<any> {
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get('http://localhost:5000/token/currentUser', options)
  }
  saveUserBuyer(user) {
    console.log(user);

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let userInfo = user;

    let options = { headers: headers };
    return this.http.put('http://localhost:5000/buyer', userInfo, options)
  }
  saveUserSeller(user) {
    console.log(user);

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let userInfo = user;
    let options = { headers: headers };
    return this.http.put('http://localhost:5000/seller', userInfo, options)
  }

    saveUserCompany(user) {
      // headers
      let headers = new HttpHeaders({
        'Authorization': this.token
      });
      let options = { headers: headers };

  let userInfo = user;
  userInfo.profile_image_url = "https://www.google.com"
  console.log(userInfo);

      return this.http.put('http://localhost:5000/company', userInfo ,options)
    }

    saveUserEmployee(user) {
      // headers
      let headers = new HttpHeaders({
        'Authorization': this.token
      });
      let options = { headers: headers };

  let userInfo = user;
  userInfo.profile_image_url = "https://www.google.com"
  console.log(userInfo);

      return this.http.put('http://localhost:5000/employee/Profile', userInfo ,options)
    }

}
