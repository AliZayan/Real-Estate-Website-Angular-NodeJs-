import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-all-company',
  templateUrl: './dash-all-company.component.html',
  styleUrls: ['./dash-all-company.component.css']
})
export class DashAllCompanyComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
