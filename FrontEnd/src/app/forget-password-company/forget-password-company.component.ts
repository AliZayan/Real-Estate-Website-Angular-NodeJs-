import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-forget-password-company',
  templateUrl: './forget-password-company.component.html',
  styleUrls: ['./forget-password-company.component.css']
})
export class ForgetPasswordCompanyComponent implements OnInit {
  message: string;
  message02: string;
  myGroup

  constructor(private router: Router, private PasswordService: PasswordService) { }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      email: new FormControl()
    });
  }
  reset(f) {
    if (f.status != 'INVALID') {
      this.PasswordService.forgetPassword(f.value.email).subscribe(res => {
        this.message = "Please Check Your Email"
      },err=>{
        this.message = err.message

      })
    } else {
      this.message = "Please Enter Your Email"
    }
  }

}
