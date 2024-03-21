
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAdvertisementService } from '../add-advertisement.service';
import { RegionService } from '../region.service';
import { BuyerService } from '../services/buyer.service';
import { RegisterService } from './../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
  isNotAuth: boolean;
  isAuth: boolean;
  message: string = null;
  regions: any;
  selectedCity;
  selectedRegion;
  image: File;
  cities
  reForm: FormGroup = new FormGroup({
    FirstName: new FormControl('', Validators.required),
    secondName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
  })

  constructor(
    private RegisterService: RegisterService,
    private router: Router,
    private AddAdvertisementService: AddAdvertisementService,
    private RegionService: RegionService,
  ) { }

  ngOnInit(): void {
    this.getCities();
    const token: string = <string>localStorage.getItem('admin-accessToken');
    if (token) {
      this.router.navigate(['']);
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
      return this.RegisterService.uploadFile(formData).subscribe(
        res=>{
          console.log(res)
          if(res){
        this.RegisterService.register(
        this.reForm.controls['FirstName'].value,
        this.reForm.controls['secondName'].value,
        this.reForm.controls['email'].value,
        this.reForm.controls['password'].value,
        this.reForm.controls['phone'].value,
        this.reForm.controls['gender'].value,
        this.reForm.controls['region'].value,
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
      if (this.reForm.value.email == '' || this.reForm.value.password == '' || this.reForm.value.name == '' || this.reForm.value.phone == '' || this.reForm.value.gender == '' || this.reForm.value.region == '') {
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
