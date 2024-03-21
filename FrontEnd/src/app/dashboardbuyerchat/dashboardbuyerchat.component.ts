import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardbuyerchat',
  templateUrl: './dashboardbuyerchat.component.html',
  styleUrls: ['./dashboardbuyerchat.component.css']
})
export class DashboardbuyerchatComponent implements OnInit {
  showMe: boolean = true
  dashbuyer: boolean = false
  dashseller: boolean = false
  dashcompany: boolean = false
  dashemployee: boolean = false
  toggle() {

    this.showMe = !this.showMe
  }
  constructor(private router: Router,) { }

  ngOnInit(): void {
    if (this.router.url.includes('/dashbuyer')) {
      this.dashbuyer= true;
      this.dashseller= false;
      this.dashcompany = false;
      this.dashemployee = false;
    }
      else if (this.router.url.includes('/dashseller')) {
        this.dashseller= true;
        this.dashbuyer= false;
        this.dashcompany= false;
        this.dashemployee = false;
    }
    else if (this.router.url.includes('/dashcompany')) {
      this.dashseller= false;
      this.dashbuyer= false;
      this.dashcompany= true;
      this.dashemployee = false;
  }
  else if (this.router.url.includes('/dashemployee')) {
    this.dashseller= false;
    this.dashbuyer= false;
    this.dashcompany= false;
    this.dashemployee = true;
}
  }
  logOut() {
    localStorage.removeItem('admin-accessToken');
    this.router.navigate(['/']);
  }
}
