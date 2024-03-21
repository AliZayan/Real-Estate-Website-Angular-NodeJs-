import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-employee-contactus',
  templateUrl: './dash-employee-contactus.component.html',
  styleUrls: ['./dash-employee-contactus.component.css']
})
export class DashEmployeeContactusComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
