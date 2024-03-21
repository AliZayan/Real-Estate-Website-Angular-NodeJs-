import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddAdvertisementService } from '../add-advertisement.service';
import { GetCurrentUserService } from '../get-current-user.service';

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.css']
})
export class DashboardEmployeeComponent implements OnInit {
  showMe: boolean = false;
  user;
  cities;
  selectedCity: number = 1;
  regions;
  selectedRegion: number = 1;
  category;
  status;
  massege;
  selectedCityId: number = null;
  toggle() {
    this.showMe = !this.showMe;
  }
  constructor(
    private router: Router,
    private GetCurrentUserService: GetCurrentUserService,
    private AddAdvertisementService: AddAdvertisementService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.getUser();
  }
  url = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
  getUser() {
    this.GetCurrentUserService.getPropertyStatus().subscribe((res) => {
      this.user = res;
      this.url =  `http://localhost:5000/file/download/?image_path=`+ res.profile_image_url;
      this.selectedCity = res.city_id;
      this.getRegion(this.selectedCity);
      this.selectedRegion = res.region_id;
    });
  }
  save() {
    this.user.region_id = this.selectedRegion

    this.GetCurrentUserService.saveUserEmployee(this.user).subscribe((res) => {
      this.massege = 'Employee Updated Successfully';
    });
  }
  getCities() {
    return this.AddAdvertisementService.getCities().subscribe((response) => {
      this.cities = response;
    });
  }

  getRegion(cityid?) {
    if (cityid) {
      return this.AddAdvertisementService.getRegion(cityid).subscribe(
        (response) => {
          this.regions = response;
        }
      );
    } else {
      return this.AddAdvertisementService.getRegion(this.selectedCity).subscribe(
        (response) => {
          this.regions = response;
        }
      );
    }


  }

  rigion(e) {
    this.selectedRegion = e.target.value;
    this.user.region_id = this.selectedRegion;
  }
}
