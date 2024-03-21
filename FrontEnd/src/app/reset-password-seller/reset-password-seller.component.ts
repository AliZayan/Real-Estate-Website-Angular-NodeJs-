import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-reset-password-seller',
  templateUrl: './reset-password-seller.component.html',
  styleUrls: ['./reset-password-seller.component.css']
})
export class ResetPasswordSellerComponent implements OnInit {
  message: string;
  err: string;
  myGroup;
  token
  constructor(private router: Router,private PasswordService: PasswordService,private route: ActivatedRoute) {
    this.token = route.snapshot.queryParams["token"];

  }
  ngOnInit(): void {

    this.myGroup = new FormGroup({
      password02: new FormControl(),
      password01: new FormControl()

    });

  }
  restPassword(f) {
    if (f.status != 'INVALID') {
      if (f.value.password01 == f.value.password02) {
        this.PasswordService.resetPassword(f.value.password01, f.value.password02,this.token).subscribe(res => {
          this.message = "Password Has Been Updated !"
          this.err = null;
        }, err => {
          this.err = err.message
        })
      } else {
        this.err = "Password Must Be Identical!"
      }
    } else {
      this.err = "Password Must Be Identical!"
    }
  }

}
