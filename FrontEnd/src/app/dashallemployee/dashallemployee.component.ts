import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashallemployee',
  templateUrl: './dashallemployee.component.html',
  styleUrls: ['./dashallemployee.component.css']
})
export class DashallemployeeComponent implements OnInit {
  showMe:boolean=true
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
