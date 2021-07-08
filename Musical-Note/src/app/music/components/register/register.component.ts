import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

import { ToastrService } from 'ngx-toastr';

import { MusicalService } from '../../service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private formBuild: FormBuilder,
    private toastr: ToastrService,
    private authUser: AngularFireAuth,
    private musicalService: MusicalService,
    private firestore: AngularFirestore
    ) { 
    this.isFormSubmitted = false;
    this.isRequestInProgress = false;
  }

  actionCodeSettings = {
    url: 'http://localhost:4200/home',
    handleCodeInApp: true,
  };
  registerForm: FormGroup;
  isFormSubmitted: boolean;
  isRequestInProgress: boolean;
  validationPattern = {
    mail: new RegExp(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`),
    username: new RegExp(`[0-9]{10}$`)
  };
  validationMessages = {
    fname: [
      { type: 'required', message: 'First name is required.' }
    ],
    mail: [
      { type: 'required', message: 'Email address is required.' },
      { type: 'pattern', message: 'Enter a valid email address.'}
    ],
    username: [
      { type: 'required', message: 'Phone number is required.' },
      { type: 'pattern', message: 'Enter a valid Phone Number.'}
    ],
    password: [
      { type: 'required', message: 'Password is required.' }
    ],
  };

  ngOnInit(): void {
    this.registrationForm();
  }

  registrationForm(): void {
    this.registerForm = this.formBuild.group(
      {
        fname: new FormControl(
          '', [Validators.required]),
        lname: new FormControl(''),
        dob: new FormControl(''),
        mail: new FormControl(
          '', [Validators.required, Validators.pattern(this.validationPattern.mail)]),
        username: new FormControl(
          '', [Validators.required, Validators.pattern(this.validationPattern.username)]),
        password: new FormControl(
          '', [Validators.required]),
        id: new FormControl(''),
        receiveMail: [false, [Validators.requiredTrue]],
        acceptTerms: [false, [Validators.requiredTrue]],
      });
  }
  get control(): any {
    return this.registerForm.controls;
  }

  getUserData(): void {
    this.isFormSubmitted = true;
    if (this.registerForm.invalid) {
      this.isFormSubmitted = false;
      return;
    }
    if(this.registerForm.valid && !this.isRequestInProgress) {
      this.isRequestInProgress = true;
      this.registerForm.value.id = this.firestore.createId();
      this.musicalService.createUser(this.registerForm.value).subscribe((data) => {
        console.log(data.isSuccessful, data.reason);
      });
    }
  }

  facebookAuth(): void {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    this.authUser.signInWithPopup(facebookProvider).then((data)=>{
      console.log(data.user);
    })
  }

  googleAuth(): void {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    this.authUser.signInWithPopup(googleProvider).then((data) => {
      console.log(data.user);
    });
  }
}
