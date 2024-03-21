import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AddadvertismentService } from '../addadvertisment.service';
import { EmployeeAds } from '../employee-ads';
import { AddAdvertisementService } from '../add-advertisement.service';
import { EmployeeAdsService } from '../employee-ads.service';
@Component({
  selector: 'app-list-of-my-properties',
  templateUrl: './list-of-my-properties.component.html',
  styleUrls: ['./list-of-my-properties.component.css']
})
export class ListOfMyPropertiesComponent implements OnInit {
  empDetail !: FormGroup;
  empObj: EmployeeAds = new EmployeeAds();
  empList;
  ads
  image: any = [];
  Found: boolean = false;
  NotFound: boolean = false;
  constructor(private formBuilder: FormBuilder, private empService: EmployeeAdsService,private router: Router  , public Addadvertisment: AddadvertismentService,
    private AddAdvertisementService: AddAdvertisementService
    ) { }

  ngOnInit(): void {

    this.getAllEmployee();
    this.Addadvertisment.getads().subscribe((data) => {
      console.log(data);
      this.ads = data;
      this.ads = this.ads.map(x => {
        x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
        console.log(x);
        return x;
      })
      console.log(this.ads);
    });
    this.empDetail = this.formBuilder.group({
      id: [''],
      type: [''],
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
    this.empService.getAllEmployee().subscribe(res => {
      this.empList = res;


      if (this.empList.length!=0){
      this.empList = this.empList.map(x => {
        x.image_url = `http://localhost:5000/file/download/?image_path=` + x.image_url;
        console.log(x);
        return x;
      })

      this.Found =true;
      this.NotFound =false;



}
else{

  this.Found =false;
  this.NotFound =true;
}


    }, err => {
      console.log("error while fetching data.")
    });
  }




  deleteEmployee(emp) {
    this.empService.deleteEmployeeAdversiment(emp).subscribe(res => {
      alert('Advertisement deleted successfully');
      this.getAllEmployee();
    }, err => {
      console.log(err);
    });

  }
  editEmployee(emp) {
    if(this.router.url.includes('/myProperties-seller')){
      this.router.navigate(['/editpropertySeller', emp]);

    }else{
      this.router.navigate(['/editproperty', emp]);

    }
    // this.empService.editEmployeeAdversiment(emp).subscribe(res => {
    //   console.log(res);
    //   this.getAllEmployee();
    // }, err => {
    //   console.log(err);
    // });

  }
}
