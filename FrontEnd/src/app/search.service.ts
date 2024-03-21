import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}
  token = localStorage.getItem('admin-accessToken');

  search(
    location?,
    region?,
    type?,
    status?,
    minprice?,
    maxprice?
  ): Observable<any> {
    let obj = {
      city_id: location,
      region_id: region,
      property_category_id: type,
      property_status_id: status,
      price_max: maxprice,
      price_min: minprice,
    };

    return this.http.post('http://localhost:5000/property/search', obj);
  }

  getMyFavoriteProperties(): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get('http://localhost:5000/property/myFavoriteProperties', options);
  }

  sendMessage(message , receiver_id): Observable<any> {
    let messageobj = {
      "message_body": message,
      "receiver_id": receiver_id
  }
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.post('http://localhost:5000/message/send',messageobj ,options);
  }

  getchat(id){
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get(`http://localhost:5000/message/getChat/`+ id ,options);
    
  }
  getChatList(){
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };
    return this.http.get(`http://localhost:5000/message/myInbox`,options);
    
  }
}
