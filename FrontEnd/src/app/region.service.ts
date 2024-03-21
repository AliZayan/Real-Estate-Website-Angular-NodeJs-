import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class RegionService {

  constructor(private http: HttpClient) { }
  getRegions(id?) {
   return this.http.get('http://localhost:5000/lookup/cityRegions/'+id)
  }

}
