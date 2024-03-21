import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAdvertisementService } from '../add-advertisement.service';
import { RegionService } from '../region.service';
import { CompanyService } from '../services/company.service';
import { RegisterCompanyService } from '../services/register-company.service';
import { RegisterService } from './../services/register.service';

@Component({
  selector: 'app-signupcompany',
  templateUrl: './signupcompany.component.html',
  styleUrls: ['./signupcompany.component.css']
})
export class SignupcompanyComponent implements OnInit {
  cities;
  selectedCity
  message: string = null;
  regions: any;
image: File;
  reForm: FormGroup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    file: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  })

  constructor(
    private RegisterCompanyService: RegisterCompanyService,
    private router: Router,
    private CompanyService: CompanyService,
    private RegionService: RegionService,private AddAdvertisementService: AddAdvertisementService,

  ) { }

  ngOnInit(): void {
    this.getCities();

    const token: string = <string>localStorage.getItem('admin-accessToken');
    if (token) {
      this.router.navigate(['/']);
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
      return this.RegisterCompanyService.uploadFile(formData).subscribe(
        res=>{
          console.log(res)
          if(res){
            this.RegisterCompanyService.register(
              this.reForm.controls['fname'].value,
              this.reForm.controls['lname'].value,
              this.reForm.controls['email'].value,
              this.reForm.controls['password'].value,
              this.reForm.controls['phone'].value,
              this.reForm.controls['region'].value,
              this.reForm.controls['street'].value,
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
      if (this.reForm.value.email == '' || this.reForm.value.password == '' || this.reForm.value.name == '' || this.reForm.value.phone == '' || this.reForm.value.contacts == '' || this.reForm.value.city == '' || this.reForm.value.street == '') {
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

