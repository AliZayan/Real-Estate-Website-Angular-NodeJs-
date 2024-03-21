import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
@Injectable({
  providedIn: 'root'
})
export class AllemployeeService {
  addEmpURL : string;
  getEmpURL : string;
  updateEmpUrl : string;
  deleteEmpUrl : string;


  token = localStorage.getItem('admin-accessToken');

  constructor(private http : HttpClient) {

    this.addEmpURL = 'http://localhost:5000/employee/addcompany';
    this.getEmpURL = 'http://localhost:5000/employee/getallcompany';
    this.updateEmpUrl = 'http://localhost:5000/employee/edit';
    this.deleteEmpUrl = 'http://localhost:5000/employee/deletecompany';

   }


  getCities(): Observable<any> {
    return this.http.get('http://localhost:5000/lookup/cities')
  }
  getRegion(cityID: number): Observable<any> {
    let idOfTheCity = cityID;
    return this.http.get(`http://localhost:5000/lookup/cityRegions/${idOfTheCity}`)
  }
   addEmployee(emp) {

    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/employee/add', emp, options);
  }

   getAllEmployee() {
    let id = 3
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get(' http://localhost:5000/user/getList/' + id, options);
  }

   updateEmployee(emp){
     // headers
     let headers = new HttpHeaders({
       'Authorization': this.token
     });
     let options = { headers: headers };
     return this.http.put('http://localhost:5000/employee/edit/' + emp.id, emp, options);
   }

   deleteEmployee(emp) {
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.delete('http://localhost:5000/employee/delete/' + emp.id, options);

  }



}
