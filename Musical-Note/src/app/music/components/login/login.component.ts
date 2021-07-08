import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private authUser: AngularFireAuth) { }

  loginForm: FormGroup;
  isFormSubmitted: boolean = false;
  validationMessages = {
    username: [
      { type: 'required', message: 'Phone number is required.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' }
    ]
  };

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username:new FormControl(
        '', [Validators.required]),
      password:new FormControl(
        '', [Validators.required]),
    })
  }
  
  getCredentials(): void {
    this.isFormSubmitted = true;
    if(this.loginForm.invalid){
      return;
    }
    this.loginForm.reset();
    this.router.navigate(['/home']);
  }

  facebookAuth(): void {
    const facebookProvider = new firebase.default.auth.FacebookAuthProvider();
    this.authUser.signInWithPopup(facebookProvider);
  }

  googleAuth(): void {
    const googleProvider = new firebase.default.auth.GoogleAuthProvider();
    this.authUser.signInWithPopup(googleProvider);
  }
}
