import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-forget-password-buyer',
  templateUrl: './forget-password-buyer.component.html',
  styleUrls: ['./forget-password-buyer.component.css']
})
export class ForgetPasswordBuyerComponent implements OnInit {
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
