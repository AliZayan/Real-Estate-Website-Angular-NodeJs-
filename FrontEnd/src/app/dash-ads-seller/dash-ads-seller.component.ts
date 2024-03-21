import { Component, OnInit } from '@angular/core';
import { AddAdvertisementService } from '.././add-advertisement.service'

@Component({
  selector: 'app-dash-ads-seller',
  templateUrl: './dash-ads-seller.component.html',
  styleUrls: ['./dash-ads-seller.component.css']
})
export class DashAdsSellerComponent implements OnInit {
  showMe: boolean = true;


  toggle() {

    this.showMe = !this.showMe

  }

  constructor() { }

  ngOnInit(): void {


  }




}
