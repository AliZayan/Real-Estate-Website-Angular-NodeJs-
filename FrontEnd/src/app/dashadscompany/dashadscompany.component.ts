import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashadscompany',
  templateUrl: './dashadscompany.component.html',
  styleUrls: ['./dashadscompany.component.css']
})
export class DashadscompanyComponent implements OnInit {
  showMe:boolean=true;
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
