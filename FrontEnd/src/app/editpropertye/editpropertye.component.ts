import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editpropertye',
  templateUrl: './editpropertye.component.html',
  styleUrls: ['./editpropertye.component.css']
})
export class EditpropertyeComponent implements OnInit {
  showMe:boolean=true;
  toggle(){

    this.showMe=!this.showMe
  }
  constructor() { }

  ngOnInit(): void {
  }

}
