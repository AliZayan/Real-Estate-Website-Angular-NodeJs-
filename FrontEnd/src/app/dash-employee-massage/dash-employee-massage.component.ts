import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-employee-massage',
  templateUrl: './dash-employee-massage.component.html',
  styleUrls: ['./dash-employee-massage.component.css']
})
export class DashEmployeeMassageComponent implements OnInit {
  showMe:boolean=false
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
