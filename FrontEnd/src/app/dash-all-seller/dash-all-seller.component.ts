import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-all-seller',
  templateUrl: './dash-all-seller.component.html',
  styleUrls: ['./dash-all-seller.component.css']
})
export class DashAllSellerComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
