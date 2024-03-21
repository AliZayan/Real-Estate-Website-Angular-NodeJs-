import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-all-buyer',
  templateUrl: './dash-all-buyer.component.html',
  styleUrls: ['./dash-all-buyer.component.css']
})
export class DashAllBuyerComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
