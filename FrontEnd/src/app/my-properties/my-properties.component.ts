import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.css']
})
export class MyPropertiesComponent implements OnInit {
  showMe: boolean = true;
  isSeller : boolean = false;
  isEmployee : boolean = false;
  isCompany : boolean = false;
  toggle() {

    this.showMe = !this.showMe
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.includes('/myProperties-seller')) {
      this.isSeller= true;

    }else if (this.router.url.includes('/myProperties-company')){
      this.isCompany = true;

    }else if (this.router.url.includes('/myProperties-employee')){
      this.isEmployee = true;
    }
  }


}
