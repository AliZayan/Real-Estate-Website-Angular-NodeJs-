import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { EmployeeAds } from '../employee-ads';

import { EmployeeAdsService } from '../employee-ads.service';

@Component({
  selector: 'app-all-property-employee',
  templateUrl: './all-property-employee.component.html',
  styleUrls: ['./all-property-employee.component.css']
})
export class AllPropertyEmployeeComponent implements OnInit {
  empDetail !: FormGroup;
  empObj : EmployeeAds = new EmployeeAds();
  empList : EmployeeAds[] = [];

  constructor(private formBuilder : FormBuilder, private empService : EmployeeAdsService) { }

  ngOnInit(): void {

    this.getAllEmployee();

    this.empDetail = this.formBuilder.group({
      id : [''],
      type : [''],
      title: [''],
      price: [''],
      status: [''],
      description: [''],
      location: [''],
      marker_latitude: [''],
      marker_langitude: [''],
      content_num_floors: [''],
      content_num_bathrooms: [''],
      content_num_bedrooms: [''],
      content_sequres: [''],
      youtube_url: [''],
      creator_type: [''],

    });

  }

  

  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res=>{
        // this.empList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }


  

  deleteEmployee(emp : EmployeeAds) {

    this.empService.deleteEmployee(emp).subscribe(res=>{
      console.log(res);
      alert('Advertisement deleted successfully');
      this.getAllEmployee();
    },err => {
      console.log(err);
    });

  }

}