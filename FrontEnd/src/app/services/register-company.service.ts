import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterCompanyService {
  token = localStorage.getItem('admin-accessToken');

  constructor(private http: HttpClient) {}

  register(
    fname: string,
    lname: string,
    email: string,
    password: string,
    phone: string,
    region: string,
    street: string,
    file: string
  ): Observable<any> {
    // headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    // headers
    let persone = {
      first_name: fname,
      last_name: lname,
      gender: 'male',
      phone: phone,
      email: email,
      password: password,
      address: street,
      profile_image_url: file,
      region_id: region,
      user_type_id: 4,
    };

    return this.http.post('http://localhost:5000/company', persone, options);
  }
  uploadFile(img:FormData): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: this.token,
    });
    let options = { headers: headers };

    console.log('file:', img.get('file'));
    return this.http.post('http://localhost:5000/file/upload', img);
  }
}
