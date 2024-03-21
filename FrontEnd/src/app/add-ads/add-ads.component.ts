import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdsServicesService } from './ads-services.service';
import { SellerService } from '../services/seller.service';
import { AddAdvertisementService } from '../add-advertisement.service';
import { GetCurrentUserService } from '../get-current-user.service';
import { EmployeeAdsService } from '../employee-ads.service';
@Component({
  selector: 'app-add-ads',
  templateUrl: './add-ads.component.html',
  styleUrls: ['./add-ads.component.css'],
})
export class AddAdsComponent implements OnInit {
  showMe: boolean = false;
  cities;
  regions;
  category;
  features;
  status;
  message: string = null;
  selectedCity;
  selectedRegion;
  selectedfeature;
  id;
  itemID;
  isedit;
  image: File;
  reForm: FormGroup = new FormGroup({
    type: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    marker_latitude: new FormControl('', Validators.required),
    marker_langitude: new FormControl('', Validators.required),
    content_num_floors: new FormControl('', Validators.required),
    content_num_bathrooms: new FormControl('', Validators.required),
    content_num_bedrooms: new FormControl('', Validators.required),
    content_sequres: new FormControl('', Validators.required),
    youtube_url: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    feature: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private AdsServicesService: AdsServicesService,
    private router: Router,
    private AddAdvertisementService: AddAdvertisementService,
    private GetCurrentUserService: GetCurrentUserService,
    private empService: EmployeeAdsService
  ) { }

  ngOnInit(): void {
    this.getCities();
    this.getPropertyCategory();
    this.getPropertyFeatures();
    this.getPropertyStatus();
    this.getUserId();
    this.itemID = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.itemID) {
      this.getPropertybyID(this.itemID);
      this.isedit = true;
    }
  }
  getPropertybyID(id) {
    this.AddAdvertisementService.getPropertybyID(id).subscribe((res: any) => {
      this.reForm.controls.content_num_bathrooms.setValue(res.bathrooms_number);
      this.reForm.controls.content_num_bedrooms.setValue(res.rooms_number);
      this.reForm.controls.content_num_floors.setValue(res.floors_number);
      this.reForm.controls.description.setValue(res.description);
      this.reForm.controls.feature.setValue(res.features[0].feature_id);
      this.reForm.controls.location.setValue(res.property_city_id);
      this.getRegion(res.property_city_id);
      this.reForm.controls.marker_langitude.setValue(res.longitude);
      this.reForm.controls.marker_latitude.setValue(res.latitude);
      this.reForm.controls.price.setValue(res.price);
      this.reForm.controls.region.setValue(res.region_id);
      this.reForm.controls.content_sequres.setValue(res.square);
      this.reForm.controls.status.setValue(res.property_status_id);
      this.reForm.controls.title.setValue(res.title);
      this.reForm.controls.type.setValue(res.property_category_id);
      this.reForm.controls.youtube_url.setValue(res.youtube_url);
    });
  }
  updateProperty() {
    console.log(this.reForm);
    var formData = new FormData();
    console.log(this.image)
    formData.append('file', this.image);
    console.log(formData.get('file'))
    return this.AddAdvertisementService.uploadFile(formData).subscribe(
      res => {
        console.log(res)
        if (res) {
    this.empService
      .editEmployeeAdversiment(
        this.itemID,
        this.reForm.controls['title'].value,
        this.reForm.controls['price'].value,
        this.reForm.controls['description'].value,
        this.reForm.controls['youtube_url'].value,
        this.reForm.controls['region'].value,
        this.reForm.controls['content_num_bedrooms'].value,
        this.reForm.controls['content_num_bathrooms'].value,
        this.reForm.controls['content_num_floors'].value,
        this.reForm.controls['marker_latitude'].value,
        this.reForm.controls['marker_langitude'].value,
        this.reForm.controls['type'].value,
        this.reForm.controls['status'].value,
        this.reForm.controls['feature'].value,
        this.reForm.controls['content_sequres'].value,
        res.image_url

        ).subscribe(
          (response) => {
            this.message = 'Property update successfully';
          },
          (err) => {
            this.message = 'Error creating property';
          }
        );
      }

    });
}

  getUserId() {
    this.GetCurrentUserService.getPropertyStatus().subscribe((res) => {
      this.id = res.id;
    });
  }
  onFileChange(event) {
    console.log(event.files[0])
    this.image = event.files[0]

  }

  onPostAds() {
    console.log(this.reForm);
    var formData = new FormData();
    console.log(this.image)
    formData.append('file', this.image);
    console.log(formData.get('file'))
    return this.AddAdvertisementService.uploadFile(formData).subscribe(
      res => {
        console.log(res)
        if (res) {
          this.AddAdvertisementService.postAds(
            this.reForm.controls['title'].value,
            this.reForm.controls['price'].value,
            this.reForm.controls['description'].value,
            this.reForm.controls['youtube_url'].value,
            this.reForm.controls['region'].value,
            this.reForm.controls['content_num_bedrooms'].value,
            this.reForm.controls['content_num_bathrooms'].value,
            this.reForm.controls['content_num_floors'].value,
            this.reForm.controls['marker_latitude'].value,
            this.reForm.controls['marker_langitude'].value,
            this.reForm.controls['type'].value,
            this.reForm.controls['status'].value,
            this.reForm.controls['feature'].value,
            this.reForm.controls['content_sequres'].value,
            res.image_url

          ).subscribe(
            (response) => {
              this.message = 'Property Created Successfully';
            },
            (err) => {
              this.message = 'You Must Fill All Input';
            }

          );


        }


      });
  }
  getCities() {
    return this.AddAdvertisementService.getCities().subscribe((response) => {
      this.cities = response;
    });
  }
  getRegion(cityid) {
    return this.AddAdvertisementService.getRegion(cityid).subscribe(
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
  getPropertyFeatures() {
    return this.AddAdvertisementService.getPropertyFeatures().subscribe(
      (response) => {
        this.features = response;
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
}
