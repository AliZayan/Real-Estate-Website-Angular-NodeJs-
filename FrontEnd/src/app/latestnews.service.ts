import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LatestnewsService {

  constructor(public httpClient : HttpClient) { }
  getEGNews() : Observable<any>{
    return this.httpClient.get("https://newsapi.org/v2/top-headlines?country=eg&apiKey=2e1c60ab54d54ebb984e378ce90b6d63");
}
}
