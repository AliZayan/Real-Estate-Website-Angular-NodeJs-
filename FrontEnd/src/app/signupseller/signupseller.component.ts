import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';
import { RegisterSellerService } from '../services/register-seller.service';
import { RegionService } from '../region.service';
import { AddAdvertisementService } from '../add-advertisement.service';
@Component({
  selector: 'app-signupseller',
  templateUrl: './signupseller.component.html',
  styleUrls: ['./signupseller.component.css']
})
export class SignupsellerComponent implements OnInit {
  message: string = null;
  regions: any;
  selectedCity
  cities
  image: File;
  reForm: FormGroup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
  })

  constructor(
    private RegisterSellerService: RegisterSellerService,
    private router: Router,
    private RegionService: RegionService,
    private AddAdvertisementService: AddAdvertisementService,
    private SellerService: SellerService,
  ) { }

  ngOnInit(): void {
    this.getCities();
    const token: string = <string>localStorage.getItem('admin-accessToken');
    if (token) {
      this.router.navigate(['/']);
    } else {
    }
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
  onFileChange(event){
    console.log(event.files[0])
    this.image=event.files[0]

  }
  onRegister() {
    if (this.reForm.valid) {
      var formData = new FormData();
      console.log(this.image)
      formData.append('file',this.image );
      console.log(formData.get('file'))
      return this.RegisterSellerService.uploadFile(formData).subscribe(
        res=>{
          console.log(res)
          if(res){
          this.RegisterSellerService.register(
          this.reForm.controls['fname'].value,
          this.reForm.controls['lname'].value,
          this.reForm.controls['email'].value,
          this.reForm.controls['password'].value,
          this.reForm.controls['phone'].value,
          this.reForm.controls['region'].value,
          this.reForm.controls['street'].value,
          this.reForm.controls['gender'].value,
          res.image_url
      ).subscribe(response => {
        localStorage.setItem('admin-accessToken', response.token);
        this.router.navigate(['/']);
        location.reload();
      }, err => {
        this.message = err.error.msg[0].message;;
      })
  }
}, err => {
  console.log(err)
}
)

} else {
      if (this.reForm.value.email == '' || this.reForm.value.password == '' || this.reForm.value.name == '' || this.reForm.value.phone == '' || this.reForm.value.gender == '' || this.reForm.value.region == '' || this.reForm.value.street == '') {
        this.message = "Please Fill Up All Mandatory Fields";
      } else if (this.reForm.controls.email.status == "INVALID") {
        this.message = "Email Is Not Valid"
      } else if (this.reForm.controls.password.status == "INVALID") {
        this.message = "Password Is Not Valid"
      } else if (this.reForm.controls.name.status == "INVALID") {
        this.message = "Name Is Not Valid"
      } else if (this.reForm.controls.phone.status == "INVALID") {
        this.message = "Phone Is Not Valid"
      }
      return this.message;
    }
  }

}

