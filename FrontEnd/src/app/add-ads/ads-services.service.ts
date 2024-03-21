import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdsServicesService {
  constructor(private http: HttpClient) {}

  postAds(type: string , title: string , price: string , status: string ,
    description : string , location: string ,marker_latitude: string
    ,marker_langitude: string ,content_num_floors: string
    ,content_num_bathrooms: string ,content_num_bedrooms:
    string ,content_sequres: string ,youtube_url: string  ):Observable<any> {
    // HTTP Req
    console.log('type :: ', type);
    console.log('title :: ', title);
    console.log('price :: ', price);
    console.log('status :: ', status);
    console.log('description :: ', description);
    console.log('location :: ', location);
    console.log('marker_latitude :: ', marker_latitude);
    console.log('marker_langitude :: ', marker_langitude);
    console.log('content_num_floors :: ', content_num_floors);
    console.log('content_num_bathrooms :: ', content_num_bathrooms);
    console.log('content_num_bedrooms :: ', content_num_bedrooms);
    console.log('content_sequres :: ', content_sequres);
    console.log('youtube_url :: ', youtube_url);



    return this.http.post('http://localhost:5000/seller/post', {
      type,
      title,
      price,
      status,
      description,
      location,
      marker_latitude,
      marker_langitude,
      content_num_floors,
      content_num_bathrooms,
      content_num_bedrooms,
      content_sequres,
      youtube_url,
    })
  }
}

