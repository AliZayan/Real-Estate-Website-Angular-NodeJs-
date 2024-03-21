import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Seller } from './seller';
@Injectable({
  providedIn: 'root'
})
export class AllsellerService {
  addEmpURL: string;
  getEmpURL: string;
  updateEmpUrl: string;
  deleteEmpUrl: string;
  token = localStorage.getItem('admin-accessToken');

  constructor(private http: HttpClient) {

    this.addEmpURL = 'http://localhost:5000/employee/Addseller';
    this.getEmpURL = 'http://localhost:5000/employee/getseller';
    this.updateEmpUrl = 'http://localhost:5000/employee/editseller';
    this.deleteEmpUrl = 'http://localhost:5000/employee/deleteseller';

  }


  addEmployee(emp) {

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/seller/add', emp, options);
  }
  editEmployee(emp) {

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/seller/edit/', emp, options);
  }

  getAllEmployee() {
    let id = 1
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get(' http://localhost:5000/user/getList/' + id, options);
  }
  getEmployeebyId(id) {
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get('http://localhost:5000/user/getById/' + id, options);
  }

  updateEmployee(emp){
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.put('http://localhost:5000/seller/edit/' + emp.id, emp, options);
  }

  deleteEmployee(emp) {
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.delete(' http://localhost:5000/seller/delete/' + emp, options);

  }


}
