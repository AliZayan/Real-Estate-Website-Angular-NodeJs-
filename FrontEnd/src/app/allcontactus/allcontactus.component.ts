import { Report } from '../report';
import { AllreportService } from './../allreport.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allcontactus',
  templateUrl: './allcontactus.component.html',
  styleUrls: ['./allcontactus.component.css']
})
export class AllcontactusComponent implements OnInit {
  empList ;
  constructor(private formBuilder : FormBuilder, private empService : AllreportService) { }

  ngOnInit(): void {
    this.GetAllContactUs();

  }

  GetAllContactUs(){
    this.empService.getAllContactUs().subscribe(res=>{
      this.empList=res;
      console.log("aLI");
        console.log(this.empList);
        console.log("aLI");
    },err=>{
      console.log("error while fetching data.")
    });


  }

  deleteEmployee(empid:any) {

    this.empService.deleteConactUs(empid).subscribe(res=>{
      console.log(res);
      alert('Message deleted successfully');
      this.GetAllContactUs();
    },err => {
      console.log(err);
    });

  }
  ConcatusMessage(empid:any){
    this.empService.ContactUsMessage(empid).subscribe(res=>{
      console.log(res);
      alert('Check your messages');
      this.GetAllContactUs();
    },err => {
      console.log(err);
    });

  }
}
