import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { LoginEmployeeService } from '../services/login-employee.service';
@Component({
  selector: 'app-loginemployee',
  templateUrl: './loginemployee.component.html',
  styleUrls: ['./loginemployee.component.css']
})
export class LoginemployeeComponent implements OnInit {
  isNotAuth: boolean;
  isAuth: boolean;
  message: string = null;

  myForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private LoginEmployeeService: LoginEmployeeService,
    private router: Router,
    private EmployeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    const token: string = <string>localStorage.getItem('admin-accessToken');
    if (token) {

      this.router.navigate(['/dashemployee']);
    } else {
    }
  }

  onLogin() {
    if (this.myForm.valid) {
      return this.LoginEmployeeService.login(
        this.myForm.controls['email'].value,
        this.myForm.controls['password'].value).subscribe(response => {
          localStorage.setItem('admin-accessToken', response.token);
          this.router.navigate(['/dashemployee']);
          location.reload();
        }, err => {
          this.message = err.error.msg;;
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
