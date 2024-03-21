import { RegionService } from './../region.service';
import { AddAdvertisementService } from './../add-advertisement.service';
import { AllemployeeService } from './../allemployee.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Employee } from '../employee';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-allemployee',
  templateUrl: './allemployee.component.html',
  styleUrls: ['./allemployee.component.css']
})
export class AllemployeeComponent implements OnInit {
  empDetail !: FormGroup;
  empObj
  empList;
  cities;
  selectedCity
  message: string = null;
  regions: any;
  editUser = false;
  firstname;
  lastname;
  email;
  gender;
  phone;
  cityid;
  regionId;
  address;
  selectedRegion
  genderr;

  constructor(
    private ElementRef: ElementRef,
    private formBuilder: FormBuilder,
    private empService: AllemployeeService,
     private AddAdvertisementService: AddAdvertisementService,
     private RegionService: RegionService,
     private empServicee : AllemployeeService) { }

  ngOnInit(): void {
this.getCities();
    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      id: [''],
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
      phone: [''],
      city: [''],
      gender: [''],
      region: [''],
      street: [''],

    });

  }

  getCities() {
    return this.AddAdvertisementService.getCities().subscribe((response) => {
      this.cities = response;
    });
  }
  getRegions(id) {
    // console.log(id.value);
    this.selectedCity = id.value
    return this.RegionService.getRegions(this.selectedCity).subscribe(response => {
      this.regions = response;
    })
  }
  setRegions(id) {
    this.empDetail.value.city = id.value
  }
  getRegion(cityid?) {
    if (cityid) {
      return this.empServicee.getRegion(cityid).subscribe(
        (response) => {
          this.regions = response;
          this.empDetail.controls['region'].setValue(this.selectedRegion);

        }
      );
    }else{
      return this.empServicee.getRegion(this.selectedCity).subscribe(
        (response) => {
          this.regions = response;
        }
      );
    }
  }
  setGender(id) {
    this.empDetail.value.gender = id.value
  }

  addEmployee() {
    let obj = {
      "first_name": this.empDetail.value.fname,
      "last_name": this.empDetail.value.lname,
      "gender": this.empDetail.value.gender,
      "phone": this.empDetail.value.phone,
      "email": this.empDetail.value.email,
      "region_id": this.empDetail.value.city,
      "password": this.empDetail.value.password,
      "address":this.empDetail.value.street,
      "profile_image_url":"https://www.google.com",
      "id_card_image_url": "https://www.google.com"
    }


    this.empService.addEmployee(obj).subscribe(res => {
      console.log(res);

      this.getAllEmployee();
    }, err => {
      console.log(err);
    });

  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res => {
      this.empList = res;
    }, err => {
      console.log("error while fetching data.")
    });
  }


   updateEmployee() {
      var employee:any ={}

      employee.id = this.empDetail.value.id;
      employee.first_name = this.empDetail.value.fname;
      employee.last_name = this.empDetail.value.lname;
      employee.email = this.empDetail.value.email;
      employee.gender = this.empDetail.value.gender;
      employee.phone = this.empDetail.value.phone;
      employee.region_id = this.empDetail.value.region;
      employee.address = this.empDetail.value.street;
      employee.profile_image_url = "https://www.google.com",
      employee.id_card_image_url= "https://www.google.com"
    console.log( 'employee', employee)

      this.empService.updateEmployee(employee).subscribe(res => {
        console.log(res);
        this.getAllEmployee();
      }, err => {
        console.log(err);
      })

    }

  deleteEmployee(emp) {

    this.empService.deleteEmployee(emp).subscribe(res => {
      console.log(res);
      alert('Employee deleted successfully');
      this.getAllEmployee();
    }, err => {
      console.log(err);
    });

  }


  editEmployee(emp ) {
    console.log('emppp',emp)


    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['fname'].setValue(emp.first_name)
    this.empDetail.controls['lname'].setValue(emp.last_name)
   this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['gender'].setValue(emp.gender);
    this.empDetail.controls['phone'].setValue(emp.phone);
    this.empDetail.controls['city'].setValue(emp.user_city_id)
    // this.empDetail.controls['region'].setValue(emp.region_id);
    this.selectedCity=emp.user_city_id;
    this.selectedRegion =emp.region_id;
    console.log('selectedCity', this.selectedCity)
    this.getRegion(emp.user_city_id);

    this.empDetail.controls['street'].setValue(emp.address);

  }


  edituser(id) {
    this.editEmployee(id);
    this.editUser = !this.editUser
  }
  }
