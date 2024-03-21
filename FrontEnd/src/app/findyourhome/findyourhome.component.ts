import { marker } from './../model/markers';
import { ActivatedRoute } from '@angular/router';
import { AddAdvertisementService } from './../add-advertisement.service';
import { AddadvertismentService } from './../addadvertisment.service';
import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-findyourhome',
  templateUrl: './findyourhome.component.html',
  styleUrls: ['./findyourhome.component.css']
})
export class FindyourhomeComponent implements OnInit {
  ads: any = [];


  lat :  any = [];
  lng :  any = [];
  id :  any = [];
  title :  any = [];
  image :  any = [];
  pointMarker :any = [];
  collection:any = [];
  constructor(private route: ActivatedRoute,
    public Addadvertisment: AddadvertismentService,
    private AddAdvertisementService: AddAdvertisementService
 ) {

   }

  ngOnInit(): void {


    this.Addadvertisment.getads().subscribe((data) => {

      this.ads = data;
      this.ads = this.ads.map(x => {
        x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
        console.log(x,"adssadad");

        return x;
      })
      for(let i=0 ; i< data.length ; i++){
        this.id[i]=data[i].id;
        this.image[i]=data[i].image_url;
        this.title[i]=data[i].title;
        this.lng[i]=data[i].longitude;
        this.lat[i]=data[i].latitude;


      }

      console.log(this.image);


    //  console.log(this.ads);
    //  this.lng=data[0].longitude;
    //  console.log(this.lng);
    //  this.lat=data[0].latitude;
    //  console.log(this.lat);
   //   this.marker.length=this.ads.length;
   //   this.lang=data.longitude;
    //  this.late=data.latitude;
    //  this.id=data.id;
    // for(let i=0 ; i<this.ads.length ; i++){
       // this.marker[i].id=this.id[i];
       // this.marker[i].lan=this.lang[i];
       // this.marker[i].lat=this.late[i];

     // }
       // console.log(this.marker);





    });



    const myLatLng = { lat: 30.04442, lng: 31.235712  }
    console.log(typeof myLatLng)
     const loader = new Loader({
        apiKey: "AIzaSyAmHi0lzrmxrqlzzlp98hLiHFbpaiNjiQ4"
      })

      loader.load().then(() =>
       {

        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center:myLatLng,
         zoom: 5,

     });


       let marker;

        const image = "../../assets/Images/home (3).png";
        var infowindow = new google.maps.InfoWindow();
        for ( let i=0; i<this.lat.length ;i++){
   const contentString =
     '<img style="width: 99%;" src="' +this.image[i] + '"/> ' +
     '<h4 style="text-align: center;">'+this.title[i]+'</h4>'+
     ' <a style=" color:#FF5A3C ;text-decoration: none;text-align: center;" href="http://localhost:4200/propertiesforsale/'+this.id[i] +'" >' +
     '<h6 style=" color:#FF5A3C ;text-align: center;"> Go to property</h6>'+"</a> " ;


     const infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth:200,
                                                    });
         marker= new google.maps.Marker({
          position: new google.maps.LatLng(this.lat[i], this.lng[i]),
          map: map,
          icon: image,
          animation: google.maps.Animation.BOUNCE,
          title: "House Marker",

 });

 marker.addListener("click", function()  {

  infowindow.open({ anchor:marker, map,shouldFocus: false,
  });
  infowindow.open(map, this);

});

}
   });






  }

}
