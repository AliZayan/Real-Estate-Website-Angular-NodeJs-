import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-employee-report',
  templateUrl: './dash-employee-report.component.html',
  styleUrls: ['./dash-employee-report.component.css']
})
export class DashEmployeeReportComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
