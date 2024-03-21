import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetCurrentUserService } from '../get-current-user.service';
import jwt_decode from 'jwt-decode';
import { SearchService } from '../search.service';
import { AddAdvertisementService } from '../add-advertisement.service';
import { AddadvertismentService } from '../addadvertisment.service';

@Component({
  selector: 'app-myfav-properties',
  templateUrl: './myfav-properties.component.html',
  styleUrls: ['./myfav-properties.component.css'],
})
export class MyfavPropertiesComponent implements OnInit {
  showMe = true;
  ads: any = [];
  myfavorite;
  dashbuyer: boolean = false;
  dashseller: boolean = false;
  dashcompany: boolean = false;
  id;
  Found: boolean = false;
  NotFound: boolean = false;
  constructor(
    private router: Router,
    private SearchService: SearchService,
    public Addadvertisment: AddadvertismentService,
    private getPropertyStatus: GetCurrentUserService,
    private AddAdvertisementService: AddAdvertisementService,
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('/buyer')) {
      this.dashbuyer = true;
      this.dashcompany = false;
      this.dashseller = false;
      this.getMyFavoriteProperties();
    } else if (this.router.url.includes('/seller')) {
      this.dashbuyer = false;
      this.dashseller = true;
      this.dashcompany = false;
      this.getMyFavoriteProperties();
    } else if (this.router.url.includes('/company')) {
      this.dashbuyer = false;
      this.dashseller = false;
      this.dashcompany = true;
      this.getMyFavoriteProperties();
    }
    this.getTokenInformation();

    this.Addadvertisment.getads().subscribe((data) => {
      console.log(data);
      this.ads = data;

      this.ads = this.ads.map(x => {
        x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
        console.log(x);
        return x;
      })
      console.log(this.ads);

    });

  }
  getTokenInformation(){
    const token = localStorage.getItem('admin-accessToken')
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    console.log(tokenInfo); // show decoded token object in console
    let name = tokenInfo.userEmail
    this.id = tokenInfo.userId
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  toggle() {
    this.showMe = !this.showMe;
  }
  logOut() {
    localStorage.removeItem('admin-accessToken');
    this.router.navigate(['/']);
  }

  getMyFavoriteProperties() {
    this.SearchService.getMyFavoriteProperties(
    ).subscribe(
      (response) => {
        this.myfavorite = response;
        this.ads = response;
        if (this.ads.length!=0){
        this.ads = this.ads.map(x => {
          x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
          return x;
        })
        console.log(this.ads);
        this.Found =true;
        this.NotFound =false;
      }
      else{

        this.Found =false;
        this.NotFound =true;
      }
      },
      (err) => {
        console.log('items is not found');
      }
    );
  }
}
