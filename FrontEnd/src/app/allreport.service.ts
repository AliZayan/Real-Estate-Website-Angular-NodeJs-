import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Report } from './report';
@Injectable({
  providedIn: 'root'
})
export class AllreportService {

  getEmpURL : string;
  deleteEmpUrl : string;
  GetContactUs : string;
  DeleteContactUs:string;
  messagee:string;
  constructor(private http : HttpClient) {



    this.getEmpURL = 'http://localhost:5000/PropertyReportRouter/ShowPropertyReport';
    this.deleteEmpUrl = 'http://localhost:5000/PropertyReportRouter/DeletePropertyReport/';
    this.GetContactUs ='http://localhost:5000/ContacUsReportReportRouter/ShowcontactusReport';
    this.DeleteContactUs='http://localhost:5000/ContacUsReportReportRouter/DeletecontactusReport/';
    this.messagee='http://localhost:5000/ContacUsReportReportRouter/msgOwner/';
  }
   token = localStorage.getItem('admin-accessToken');

   getAllEmployee(){

    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
     return this.http.get(this.getEmpURL,options);

   }



   deleteEmployee(emp : Report){
// headers
let headers = new HttpHeaders({
  'Authorization': this.token
});
let options = { headers: headers };
return this.http.delete(this.deleteEmpUrl+emp.id,options);

   }


getAllContactUs(){
  let headers = new HttpHeaders({
    'Authorization': this.token
  });
  let options = { headers: headers };
   return this.http.get(this.GetContactUs,options);


}

deleteConactUs(empid:any){
  // headers
  let headers = new HttpHeaders({
    'Authorization': this.token
  });
  let options = { headers: headers };
  return this.http.delete(this.DeleteContactUs+empid,options);

     }

ContactUsMessage(empid:any){
      // headers
      let headers = new HttpHeaders({
        'Authorization':this.token

      });
      let options = { headers: headers };
      console.log(options);
      return this.http.post(this.messagee+empid,null,options);

         }
}

