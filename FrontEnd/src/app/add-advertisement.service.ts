import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddAdvertisementService {
  token = localStorage.getItem('admin-accessToken');

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  };

  uploadFile(img: FormData): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: this.token,
    });
    let options = { headers: headers };

    console.log('file:', img.get('file'));
    return this.http.post('http://localhost:5000/file/upload', img);
  }
  getCities(): Observable<any> {
    return this.http.get('http://localhost:5000/lookup/cities')
  }
  getRegion(cityID: number): Observable<any> {
    let idOfTheCity = cityID;
    return this.http.get(`http://localhost:5000/lookup/cityRegions/${idOfTheCity}`)
  }
  getPropertyCategory(): Observable<any> {
    return this.http.get('http://localhost:5000/lookup/propertyCategories')
  }
  getPropertyFeatures(): Observable<any> {
    return this.http.get('http://localhost:5000/lookup/propertyFeatures')
  }
  getPropertyStatus(): Observable<any> {
    return this.http.get('http://localhost:5000/lookup/propertyStatuses')
  }

  postAds(title, price, description, youtube_url, region_ID, content_num_bedrooms, content_num_bathrooms, content_num_floors, marker_latitude, marker_langitude, category, status, feature,content_sequres, file: string) {
    let obj = {
      "title": title,
      "price": price,
      "description": description,
      "youtube_url": youtube_url,
      "region_id": region_ID,
      "rooms_number": content_num_bedrooms,
      "bathrooms_number": content_num_bathrooms,
      "floors_number": content_num_floors,
      "latitude": marker_latitude,
      "longitude": marker_langitude,
      "property_category_id": category,
      "property_status_id": status,
      "square": content_sequres,
      "feature_ids": [
        feature
      ],

      "image_url": file
    }
    // headers
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };

    // headers
    console.log("ahmed")
console.log(obj)
    return this.http.post('http://localhost:5000/property', obj, options)
  }
  getPropertybyID(id) {
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };

    // headers
    return this.http.get('http://localhost:5000/property/getById/' + id)

  }
  addpropetytoFav(propertyid, is_favorite): Observable<any> {
    let obj = {
      "property_id": propertyid,
      "is_favorite": is_favorite
    }
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };

    return this.http.post('http://localhost:5000/property/userFavorite', obj, options);
  }
  isProperyFav(id) {
    let headers = new HttpHeaders({
      'Authorization': this.token
    });
    let options = { headers: headers };

    // headers
    return this.http.get('http://localhost:5000/property/isFavorite/' + id, options)
  }
}
