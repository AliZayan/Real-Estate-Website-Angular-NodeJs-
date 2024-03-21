import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AddAdvertisementService } from '../add-advertisement.service';
import { AddadvertismentService } from '../addadvertisment.service';
import { EmployeeAdsService } from '../employee-ads.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-dash-employee-all-ads',
  templateUrl: './dash-employee-all-ads.component.html',
  styleUrls: ['./dash-employee-all-ads.component.css']
})
export class DashEmployeeAllAdsComponent implements OnInit {
  ads;
  cities;
  selectedCity;
  regions;
  selectedRegion;
  category;
  status;
  showMe: boolean = true;
  empList
  toggle(){

    this.showMe=!this.showMe
  }
  constructor(public Addadvertisment: AddadvertismentService,
    private SearchService: SearchService,
    private AddAdvertisementService: AddAdvertisementService,
    private router: Router,
    private formBuilder: FormBuilder,
    private empService: EmployeeAdsService) { }

  ngOnInit(): void {
    this.Addadvertisment.getads().subscribe((data) => {
      console.log(data);
      this.ads = data;
      this.ads = this.ads.map(x => {
        x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
        console.log(x);
        return x;
      })
    });
  }

  deleteEmployee(emp) {
    this.empService.deleteEmployeeAdversiment(emp).subscribe(res => {
      alert('Advertisement deleted successfully');
      this.router.navigate(['/allads']);
      this.getAllEmployee();
    }, err => {
      console.log(err);
    });

  }
  editEmployee(emp) {

      this.router.navigate(['/editpropertye', emp]);



  }
  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res => {
      this.empList = res;

    }, err => {
      console.log("error while fetching data.")
    });
  }

}
