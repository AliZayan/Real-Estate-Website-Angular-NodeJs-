import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddadvertismentService } from '../addadvertisment.service';
import { filter, map, tap } from 'rxjs/operators';
import { AddAdvertisementService } from '../add-advertisement.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Loader } from '@googlemaps/js-api-loader';
import { Router } from '@angular/router';
import { AllreportService } from '../allreport.service';
@Component({
  selector: 'app-property-for-sale-details',
  templateUrl: './property-for-sale-details.component.html',
  styleUrls: ['./property-for-sale-details.component.css']
})
export class PropertyForSaleDetailsComponent implements OnInit {
  itemID: number;
  theADD;
  source;
  notFav;
  istheruser;
  istherusermessage;
  istheruserReport;
  createBy
  url;
  src;
  lng;
  lat;
  ads: any = [];
  message: string = null;
  messageR: string = null;
  title;
  personalurl;
  token = localStorage.getItem('admin-accessToken');
  reForm: FormGroup = new FormGroup({

    description: new FormControl('', Validators.required),

  });
  ReportForm: FormGroup = new FormGroup({

    Reportdescription: new FormControl('', Validators.required),

  });

  id: any;
  constructor(private route: ActivatedRoute,
     public Addadvertisment: AddadvertismentService,
      private AddAdvertisementService: AddAdvertisementService
      ,public LoginService:LoginService
      ,private domSanitizer : DomSanitizer,
        private router: Router,
        ) { }



  ngOnInit(): void {


    this.notFav = true
    this.itemID = parseInt(this.route.snapshot.paramMap.get('id'));
    this.Addadvertisment.getadsid(this.itemID).subscribe((data) => {
      this.theADD = data;
      this.lng=data.longitude;
      this.title=data.title;
      this.lat=data.latitude;
      this.id=data.id;
      this.src=this.domSanitizer.bypassSecurityTrustResourceUrl(this.theADD.youtube_url);
      console.log("ahmed");
      console.log(data);
      console.log("ahmed");
      this.url = `http://localhost:5000/file/download/?image_path=` + data.image_url;
      this.personalurl= `http://localhost:5000/file/download/?image_path=` + data.profile_image_url;
    });
    if (this.token) {
      this.istheruser = true;
      this.isPropertyfav()
    } else {
      this.istheruser = false;

    }

    if(this.token){
      this.istherusermessage = true;
    }
    else{
      this.istherusermessage = false;
    }

    if(this.token){
      this.istheruserReport = true;
    }
    else{
      this.istheruserReport = false;
    }

    const myLatLng = { lat: 30.04442, lng: 31.235712  }
    console.log(typeof myLatLng)
     const loader = new Loader({
        apiKey: "AIzaSyAmHi0lzrmxrqlzzlp98hLiHFbpaiNjiQ4"
      })

      loader.load().then(() => {
         const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
          center: { lat:this.lat, lng:this.lng },
          zoom: 15,

        });




        const image = "../../assets/Images/home (3).png";
        const marker= new google.maps.Marker({
          position:{ lat:this.lat, lng:this.lng },
          map,
          icon: image,
          animation: google.maps.Animation.BOUNCE,
          title: "House Marker",

                                });




      });



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

  fav() {
    this.notFav = !this.notFav;
    if (this.notFav == false) {
      this.sendToFav();
      alert('User favorite created successfully')
    } else {
      this.sendToFav();
      alert('User favorite removed successfully')
    }
  }
  isthereAuser() {
    if (this.istheruser) {
      this.fav();
    } else {
      alert("Please You Need To Login First")
    }
  }

  IsThereMessage() {
    if (this.istherusermessage) {
      this.onPostAds();
    } else {
      alert("Please You Need To Login First")
    }
  }
  IsThereReport() {
    if (this.istheruserReport) {
      this.OnReport();
    } else {
      alert("Please You Need To Login First")
    }
  }

  sendToFav() {
    this.AddAdvertisementService.addpropetytoFav(this.itemID, !this.notFav).subscribe(e => {

    }, err => {
      alert("Error");
      this.notFav = true;
    })
  }
  isPropertyfav() {
    this.AddAdvertisementService.isProperyFav(this.itemID).subscribe(e => {
      console.log(e);
      if (e[0]) {
        this.notFav = false;
      }
      // if(e[0].is_deleted == true){
      //   this.notFav = false;
      // }else if (e[0].is_deleted == false){
      //   this.notFav = true;
      // }
    }, err => {
      this.notFav = true;
    })

  }
  onPostAds(){
    if (this.reForm.valid) {
       this.LoginService.Message(this.reForm.controls['description'].value, this.theADD.created_by)
        .subscribe(
          (response) => {
            this.message = 'Message Send Successfully';
          },
          (err) => {
            this.message = 'Please Fill The Message';
          }

        );
    }
    else if(this.reForm.value.description == '') {

        this.message = "Please Enter Your Message"



  }
}

OnReport(){
  if (this.ReportForm.valid) {
     this.LoginService.Report(this.ReportForm.controls['Reportdescription'].value, this.theADD.id)
      .subscribe(
        (response) => {
          this.messageR = 'Report Send Successfully';
        },
        (err) => {
          this.messageR = 'Please Fill The Report';
        }

      );
  }
  else if(this.ReportForm.value.Reportdescription == '') {

      this.messageR = "Please Enter Your Report"



}
}

}
