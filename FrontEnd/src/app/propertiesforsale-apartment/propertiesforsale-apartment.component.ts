import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAdvertisementService } from './../add-advertisement.service';
import { SearchService } from './../search.service';
import { AddadvertismentService } from './../addadvertisment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-propertiesforsale-apartment',
  templateUrl: './propertiesforsale-apartment.component.html',
  styleUrls: ['./propertiesforsale-apartment.component.css']
})
export class PropertiesforsaleApartmentComponent implements OnInit {
  ads: any = [];
  cities;
  selectedCity;
  regions;
  selectedRegion;
  category;
  status;
  Found : boolean=false;
  NotFound : boolean=false;
  DataNotfound : boolean=false;


  constructor(
    public Addadvertisment: AddadvertismentService,
    private SearchService: SearchService,
    private AddAdvertisementService: AddAdvertisementService,
    private router: Router
  ) { }
  reForm: FormGroup = new FormGroup({
    location: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    minprice: new FormControl('', Validators.required),
    maxprice: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.getCities();
    this.getPropertyCategory();
    this.getPropertyStatus();


    this.Addadvertisment.getadsApartment().subscribe((data) => {
      console.log(data);
      this.ads = data;


      if (this.ads.length!=0){

       this.ads = this.ads.map(x => {
        x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
        console.log(x);
        return x;
      })
      console.log(this.ads);
      this.Found =true;
      this.DataNotfound =false;
      }
      else{

        this.Found =false;
        this.DataNotfound =true;
      }


    });
  }
  getCities() {
    return this.AddAdvertisementService.getCities().subscribe((response) => {
      this.cities = response;
    });
  }

  getRegion(event : Event) {
    let id= (event.target as HTMLInputElement).value
    return this.AddAdvertisementService.getRegion(parseInt(id)).subscribe(
      (response) => {
        this.regions = response;
      }
    );
  }


  getPropertyCategory() {
    return this.AddAdvertisementService.getPropertyCategory().subscribe(
      (response) => {
        this.category = response;
      }
    );
  }

  getPropertyStatus() {
    return this.AddAdvertisementService.getPropertyStatus().subscribe(
      (response) => {
        this.status = response;
      }
    );
  }

  onSearch() {
    this.SearchService.search(
      this.reForm.controls['location'].value,
      this.reForm.controls['region'].value,
      this.reForm.controls['type'].value,
      this.reForm.controls['status'].value,
      this.reForm.controls['minprice'].value,
      this.reForm.controls['maxprice'].value,
    ).subscribe(
      (response) => {
        this.ads = response;

        if (this.ads.length!=0){
    this.ads = this.ads.map(x => {
          x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
          return x;
        })

          this.Found =true;
          this.NotFound =false;

        }
        else{

          this.Found =false;
          this.NotFound =true;


        }

        console.log(this.ads);
      },
      (err) => {
        console.log('items is not found');
      }
    );
  }
}
