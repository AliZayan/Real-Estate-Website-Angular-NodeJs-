import { Component, OnInit } from '@angular/core';
import { Report } from '../report';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AllreportService } from '../allreport.service';
@Component({
  selector: 'app-allreport',
  templateUrl: './allreport.component.html',
  styleUrls: ['./allreport.component.css']
})
export class AllreportComponent implements OnInit {
  empDetail !: FormGroup;
  empObj : Report = new Report();
  empList ;

  constructor(private formBuilder : FormBuilder, private empService : AllreportService) { }

  ngOnInit(): void {

    this.getAllEmployee();
console.log(this.getAllEmployee())
    this.empDetail = this.formBuilder.group({
      id : [''],
      name : [''],
      email: [''],
      text: [''],


    });

  }



  getAllEmployee() {
    this.empService.getAllEmployee().subscribe(res=>{
      this.empList=res;
      console.log("AHMED");
        console.log(this.empList);
        console.log("AHMED");
    },err=>{
      console.log("error while fetching data.")
    });
  }




  deleteEmployee(emp : Report) {

    this.empService.deleteEmployee(emp).subscribe(res=>{
      console.log(res);
      alert('Report deleted successfully');
      this.getAllEmployee();
    },err => {
      console.log(err);
    });

  }

}
