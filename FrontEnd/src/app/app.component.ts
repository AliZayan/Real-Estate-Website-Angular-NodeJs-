import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { GetCurrentUserService } from './get-current-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'RealEstate';
  isThereAUser: boolean = false;
  personName:string;
  userType;
  constructor(private router: Router,private GetCurrentUserService: GetCurrentUserService) {

  }
  ngOnInit(): void {
    this.isThereAUser = false;
    this.islogIn();
    this.getTokenInformation();
    this.getUser();

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.islogIn();
    this.getTokenInformation();
    this.getUser();
  }
  islogIn() {
    const token: string = <string>localStorage.getItem('admin-accessToken');
    if (token) {
      this.isThereAUser = true;
    } else {
      this.isThereAUser = false;
    }
  }
  logOut() {
    localStorage.removeItem('admin-accessToken');
    this.islogIn();
    this.router.navigate(['/']);
  }
  e(event) {
    console.log(event);
  }
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
  url ='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
  getUser() {
    this.GetCurrentUserService.getPropertyStatus().subscribe(res => {
      this.personName = res.first_name;
     if(this.url!=null){
          this.url =  `http://localhost:5000/file/download/?image_path=`+ res.profile_image_url;

      }

      console.log("this.personName ");
      console.log(this.url);
      console.log("this.personName ");
    })
  }
  getTokenInformation(){
    const token = localStorage.getItem('admin-accessToken')
    const tokenInfo = this.getDecodedAccessToken(token); // decode token
    console.log(tokenInfo); // show decoded token object in console3
    let name = tokenInfo.userEmail
    this.userType = tokenInfo.userTypeId
    // this.personName= name.split('@')[0]
  }
  goBack(){
    this.getTokenInformation()
    if(this.userType =='1'){
      this.router.navigate(['/sellerFavProperties']);
    }else if(this.userType =='2'){
      this.router.navigate(['/buyerFavProperties']);
    }else if(this.userType =='3'){
      this.router.navigate(['/dashemployee']);
    }else if(this.userType =='4'){
      this.router.navigate(['/companyFavProperties']);
    }

  }
}
