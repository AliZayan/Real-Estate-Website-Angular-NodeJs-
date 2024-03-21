import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { LoginCompanyService } from '../services/login-company.service';
@Component({
  selector: 'app-logincompany',
  templateUrl: './logincompany.component.html',
  styleUrls: ['./logincompany.component.css']
})
export class LogincompanyComponent implements OnInit {
  message: string = null;

  myForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private LoginCompanyService: LoginCompanyService,
    private router: Router,
    private CompanyService: CompanyService,
  ) { }

  ngOnInit(): void {
    const token: string = <string>localStorage.getItem('admin-accessToken');
    if (token) {
      this.router.navigate(['/']);
    } else {
    }
  }

  onLogin() {
    if (this.myForm.valid) {
      return this.LoginCompanyService.login(
        this.myForm.controls['email'].value,
        this.myForm.controls['password'].value      ).subscribe(response => {
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
        this.message = "Password Is Not Required"
      }
      return this.message
    }
  }
}
