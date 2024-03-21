import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Company } from './company';
@Injectable({
  providedIn: 'root'
})
export class AllcompanyService {
  addEmpURL : string;
  getEmpURL : string;
  updateEmpUrl : string;
  deleteEmpUrl : string;

  token = localStorage.getItem('admin-accessToken');

  constructor(private http : HttpClient) {

    this.addEmpURL = 'http://localhost:5000/employee/addcompany';
    this.getEmpURL = 'http://localhost:5000/employee/getallcompany';
    this.updateEmpUrl = 'http://localhost:5000/employee/editcompany';
    this.deleteEmpUrl = 'http://localhost:5000/employee/deletecompany';

   }

   addEmployee(emp) {

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/company/add', emp, options);
  }

   getAllEmployee() {
    let id = 4
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get(' http://localhost:5000/user/getList/' + id, options);
  }

  updateEmployee(emp) {

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.put('http://localhost:5000/company/edit/'+emp.id, emp, options);
  }


   deleteEmployee(emp) {
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.delete('http://localhost:5000/company/delete/' + emp, options);

  }


}
