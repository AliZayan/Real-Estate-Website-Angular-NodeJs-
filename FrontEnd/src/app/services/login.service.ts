import { Report } from './../report';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoginService implements OnInit {
  myMessage$: Observable<any>;
  myMessageSubject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  };
  token = localStorage.getItem('admin-accessToken');


  login(email: string, password: string): Observable<any> {
    const user_type_id = 2;
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

  Message(message_body: string, receiver_id: string): Observable<any> {


    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };

    return this.http.post('http://localhost:5000/message/send', {
      message_body,
      receiver_id,

    }, options)
  }

  Report(Message_Body: string, Property_id: string): Observable<any> {

    console.log(Message_Body)
    console.log(Property_id)
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
   console.log(options)
    return this.http.post('http://localhost:5000/PropertyReportRouter/MakePropertyReport', {
      Message_Body,
      Property_id,

    }, options)

  }

}
