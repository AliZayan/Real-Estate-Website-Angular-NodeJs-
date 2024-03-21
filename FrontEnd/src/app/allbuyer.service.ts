import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Buyer } from './buyer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllbuyerService {
  addEmpURL : string;
  getEmpURL : string;
  updateEmpUrl : string;
  deleteEmpUrl : string;
  token = localStorage.getItem('admin-accessToken');

  constructor(private http : HttpClient) {

    this.addEmpURL = 'http://localhost:5000/employee/AddingbBuyers';
    this.getEmpURL = 'http://localhost:5000/employee/getallbuyer';
    this.updateEmpUrl = 'http://localhost:5000/employee/editbuyer';
    this.deleteEmpUrl = 'http://localhost:5000/employee/deletebuyer';

   }

   addEmployee(emp) {

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/buyer/add', emp, options);
  }

  //  getAllEmployee(): Observable<Buyer[]>{
  //    return this.http.get<Buyer[]>(this.getEmpURL);
  //  }

  updateEmployee(emp) {

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.put('http://localhost:5000/buyer/edit/'+emp.id, emp, options);
  }

   deleteEmployee(emp) {
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.delete('http://localhost:5000/buyer/delete/' + emp, options);

  }
    getAllEmployee() {
    let id = 2
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get(' http://localhost:5000/user/getList/' + id, options);
  }


}
