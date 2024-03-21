import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAds } from './employee-ads';
@Injectable({
  providedIn: 'root',
})
export class EmployeeAdsService {
  token = localStorage.getItem('admin-accessToken');

  getEmpURL: string;
  deleteEmpUrl: string;

  constructor(private http: HttpClient) {
    this.getEmpURL = 'http://localhost:5000/employee/search';
    this.deleteEmpUrl = 'http://localhost:5000/employee/delete';
  }

  getAllEmployee() {
    // headers
    let headers = new HttpHeaders({
      Authorization: this.token,
    });
    let options = { headers: headers };
    // headers
    return this.http.get(
      'http://localhost:5000/property/myProperties',
      options
    );
  }

  deleteEmployee(emp )  {
    return this.http.post<EmployeeAds>(this.deleteEmpUrl, emp);
  }

  deleteEmployeeAdversiment(id) {
    // headers
    let headers = new HttpHeaders({
      Authorization: this.token,
    });
    let options = { headers: headers };
    // headers
    return this.http.delete(
      `http://localhost:5000/property/delete/` + id,
      options
    );
  }

  uploadFile(img: FormData): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: this.token,
    });
    let options = { headers: headers };

    console.log('file:', img.get('file'));
    return this.http.post('http://localhost:5000/file/upload', img);
  }
  editEmployeeAdversiment(
    id,
    title,
    price,
    description,
    youtube_url,
    region_ID,
    content_num_bedrooms,
    content_num_bathrooms,
    content_num_floors,
    marker_latitude,
    marker_langitude,
    category,
    status,
    feature,
    content_sequres,
    file : string
  ) {
    let obj = {
      title: title,
      price: price,
      description: description,
      youtube_url: youtube_url,
      region_id: region_ID,
      rooms_number: content_num_bedrooms,
      bathrooms_number: content_num_bathrooms,
      floors_number: content_num_floors,
      latitude: marker_latitude,
      longitude: marker_langitude,
      property_category_id: category,
      property_status_id: status,
      square: content_sequres,
      feature_ids: [feature],
      image_url: file
    };
    // headers
    let headers = new HttpHeaders({
      Authorization: this.token,
    });
    let options = { headers: headers };

    // headers
    console.log(obj)
    return this.http.put(
      `http://localhost:5000/property/edit/` + id,
      obj,
      options
    )
    ;
  }
}
