import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddAdvertisementService } from '../add-advertisement.service';
import { GetCurrentUserService } from '../get-current-user.service';

@Component({
  selector: 'app-dashboard-buyer',
  templateUrl: './dashboard-buyer.component.html',
  styleUrls: ['./dashboard-buyer.component.css']
})
export class DashboardBuyerComponent implements OnInit {
  showMe: boolean = true;
  user;
  massege
  cities;
   selectedCity:number=1;
  regions;
   selectedRegion:number=1;
  category;
  status;

  toggle() {

    this.showMe = !this.showMe
  }
  constructor(private router: Router,
    private GetCurrentUserService: GetCurrentUserService,
    private AddAdvertisementService: AddAdvertisementService) {
      this.getUser()

}

  ngOnInit(): void {
    this.getUser();
    this.getCities();

  }
  url = 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
  getUser() {
    this.GetCurrentUserService.getPropertyStatus().subscribe((res) => {
      this.user = res;
      console.log(res);
      console.log(res.profile_image_url);
      this.url =  `http://localhost:5000/file/download/?image_path=`+ res.profile_image_url;
      this.selectedCity = res.city_id;
      this.getRegion(this.selectedCity);
      this.selectedRegion = res.region_id;
    });
  }


  save(){
    this.user.region_id = this.selectedRegion
    this.GetCurrentUserService.saveUserBuyer(this.user).subscribe(res => {
      this.massege ="Buyer Updated Successfully"
      console.log(res);

    })
  }

  getRegion(cityid?) {
    if (cityid) {
      return this.AddAdvertisementService.getRegion(cityid).subscribe(
        (response) => {
          this.regions = response;
        }
      );
    }else{
      return this.AddAdvertisementService.getRegion(this.selectedCity).subscribe(
        (response) => {
          this.regions = response;
        }
      );
    }
  }
  getCities() {
    return this.AddAdvertisementService.getCities().subscribe((response) => {
      this.cities = response;
    });
  }
}
