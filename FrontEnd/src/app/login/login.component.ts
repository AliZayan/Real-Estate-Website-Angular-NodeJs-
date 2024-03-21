import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyerService } from '../services/buyer.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = null;

  myForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private loginService: LoginService,
    private router: Router,
    private buyerService: BuyerService,
  ) {
  }

  ngOnInit(): void {
    const token: string = <string>localStorage.getItem('admin-accessToken');
    if (token) {
      this.router.navigate(['/']);
    } else {
    }
  }

  onLogin() {
    if (this.myForm.valid) {
      return this.loginService.login(this.myForm.controls['email'].value, this.myForm.controls['password'].value)
        .subscribe(response => {
          localStorage.setItem('admin-accessToken', response.token);
          this.router.navigate(['/']);
          location.reload();
        }, err => {
          this.message =  err.error.msg;;
        })
    } else {
      if (this.myForm.value.email == '' || this.myForm.value.password == '') {
        this.message = "Email or Password Can't Be Empty"
      } else if (this.myForm.controls.email.status == "INVALID") {
        this.message = "Email Is Not Valid"
      } else if (this.myForm.controls.password.status == "INVALID") {
        this.message = "Password Is Not Valid"
      }
      return this.message;
    }
  }
}
