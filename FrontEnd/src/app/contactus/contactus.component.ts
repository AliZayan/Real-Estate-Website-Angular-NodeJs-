import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { ContactusService } from '../contactus.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  persone = {
    name: '',
    mail: '',
    message: ''
  };
  isNotAuth: boolean;
  isAuth: boolean;
  istheruser;
  token = localStorage.getItem('admin-accessToken');
  warning: string = null;
  alert: boolean = false;
  alertfail: boolean = false;
  ContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    text: new FormControl('', Validators.required),
  });
  constructor(
    private ContactusService: ContactusService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    if (this.token) {
      this.istheruser = true;

    } else {
      this.istheruser = false;

    }
  }

  get name() {
    return this.ContactForm.get('name');
  }
  get email() {
    return this.ContactForm.get('email');
  }
  get message() {
    return this.ContactForm.get('text');
  }
  createHiddenElement() {
    const el = document.createElement('a');
    el.setAttribute('href', `mailto:${this.persone.mail}?subject=${this.persone.name}&body=${this.persone.message}`);
    el.setAttribute('id', 'element');
    el.style.visibility = 'hidden';
    const box = document.getElementById('send');
    box.appendChild(el);
    el.click();
    const removeed = document.getElementById('element');
    removeed.remove();
  }
  onUserSubmit(): void {
    if (this.ContactForm.valid) {
      this.ContactusService.register(
        this.ContactForm.controls['text'].value
      ).subscribe(response => {
        this.isNotAuth = false;
        this.isAuth = true;
        this.createHiddenElement();
        this.warning = "Submit successfully"
      }, err => {
        this.warning = "Ops ! try send us agian";
        console.log(err.message);
      })
    } else {
      if (this.ContactForm.value.email == '' || this.ContactForm.value.message == '' || this.ContactForm.value.message == '') {
        this.warning = "Name, Email or Messages can't be empty"
      } else if (this.ContactForm.controls.email.status == "INVALID") {
        this.warning = "Email is not valid"
      } else if (this.ContactForm.controls.message.status == "INVALID") {
        this.warning = "Message is not valid"
      } else if (this.ContactForm.controls.name.status == "INVALID") {
        this.warning = "Name is not valid"
      }
      this.warning;
    }
  }
  isthereAuser() {
    if (this.istheruser) {
      this.onUserSubmit();
    } else {
      alert("Please You Need To Login First")
    }
  }
}






