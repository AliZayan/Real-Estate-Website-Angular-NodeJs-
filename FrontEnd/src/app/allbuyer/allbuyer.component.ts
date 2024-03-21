import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Buyer } from '../buyer';
import { AllbuyerService } from '../allbuyer.service';
import { AddAdvertisementService } from '../add-advertisement.service';
import { RegionService } from '../region.service';
@Component({
  selector: 'app-allbuyer',
  templateUrl: './allbuyer.component.html',
  styleUrls: ['./allbuyer.component.css']
})
export class AllbuyerComponent implements OnInit {
  empDetail : FormGroup;
  empObj
  empList ;
  selectedCity
  cities
  regions
  selectedRegion: number = 1
  gender
  cityid
  reginiIDDD;
  firstname;
  lastname;
  email;
  genderr;
  phone;
  regionId;
  address;
  constructor(private formBuilder : FormBuilder,
     private empService : AllbuyerService,
      private AddAdvertisementService: AddAdvertisementService,
      private RegionService: RegionService,) { }

  ngOnInit(): void {
    this.getCities();

    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      id: [''],
      fname: [''],
      lname: [''],
      email: [''],
      password: [''],
      gender: [''],
      phone: [''],
      city: [''],
      region: [''],
    });

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
    }


    this.empService.addEmployee(obj).subscribe(res=>{
      console.log(res);

      this.getAllEmployee();
    },err=>{
        console.log(err);
    });

  }
  getCities() {
    return this.AddAdvertisementService.getCities().subscribe((response) => {
      this.cities = response;
    });
  }
  setRegions(id) {
    this.empDetail.value.city = id.value
  }
  getRegionss(id) {
    this.selectedCity = id.value
    return this.RegionService.getRegions(this.selectedCity).subscribe(response => {
      console.log(response);
      this.regions = response;
    })
  }

  getRegions(cityid?) {
    if (cityid) {
      return this.RegionService.getRegions(cityid).subscribe((response) => {
        this.regions = response
        this.empDetail.controls['region'].setValue(this.selectedRegion)
      })
    } else {
      return this.RegionService.getRegions(this.selectedCity)
        .subscribe((response) => {
          this.regions = response
        })
    }
  }

  setGender(id) {
    this.empDetail.value.gender = id.value
  }

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res=>{
      console.log(res);

        this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editEmployee(emp ) {
    console.log('emppp', emp)
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['fname'].setValue(emp.first_name)
    this.empDetail.controls['lname'].setValue(emp.last_name)
   this.empDetail.controls['email'].setValue(emp.email);
    this.empDetail.controls['gender'].setValue(emp.gender);
    this.empDetail.controls['phone'].setValue(emp.phone);
    this.empDetail.controls['city'].setValue(emp.user_city_id)
    this.selectedCity = emp.user_city_id
    this.selectedRegion = emp.region_id
    console.log('selectedCity', this.selectedCity)
    this.getRegions(emp.user_city_id)
  }

  updateEmployee() {
    var employee: any = {}

     employee.id = this.empDetail.value.id;
     employee.first_name = this.empDetail.value.fname
     employee.last_name = this.empDetail.value.lname
     employee.gender = this.empDetail.value.gender
     employee.phone = this.empDetail.value.phone
     employee.region_id = this.empDetail.value.region
     employee.address = this.empDetail.value.address
      console.log(employee)
    this.empService.updateEmployee(employee).subscribe(res=>{
      console.log(res);
      this.getAllEmployee();
    },err=>{
      console.log(err);
    })

  }

  deleteEmployee(emp : Buyer) {

    this.empService.deleteEmployee(emp).subscribe(res=>{
      console.log(res);
      alert('Buyer deleted successfully');
      this.getAllEmployee();
    },err => {
      console.log(err);
    });

  }

}
