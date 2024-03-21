import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddadvertismentService {

  constructor(public httpClient : HttpClient) { }
  getads() : Observable<any>{
    let obj = null
    return this.httpClient.post("http://localhost:5000/property/search",obj);
}
getadsid(id) : Observable<any>{
  return this.httpClient.get("http://localhost:5000/property/getById/"+id);
}

getadsApartment() : Observable<any>{

  return this.httpClient.get("http://localhost:5000/property/apartement");

}
getadsVilla() : Observable<any>{


  return this.httpClient.get("http://localhost:5000/property/villa");

}
getadsStore() : Observable<any>{


  return this.httpClient.get("http://localhost:5000/property/store");

}
getadsTownHouse() : Observable<any>{


  return this.httpClient.get("http://localhost:5000/property/townHouse");

}
getadsWareHouse() : Observable<any>{


  return this.httpClient.get("http://localhost:5000/property/warehouse");

}
getadsOffice() : Observable<any>{


  return this.httpClient.get("http://localhost:5000/property/office");

}
}
