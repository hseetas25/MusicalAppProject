import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  isFormSubmitted: boolean;
  isRequestInProgress: boolean;
  contactUsForm: FormGroup;
  validationPattern = {
    mail: new RegExp(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)
  };
  validationMessages = {
    name: [
      { type: 'required', message: 'First name is required.' }
    ],
    mail: [
      { type: 'required', message: 'Email address is required.' },
      { type: 'pattern', message: 'Enter a valid email address.'}
    ],
    comment: [
      { type: 'required', message: 'Comment is Required' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.isFormSubmitted = false;
    this.isRequestInProgress = false;
  }

  ngOnInit(): void {
   this.initializeForm(); 
  }

  initializeForm(): void {
    this.contactUsForm = this.formBuilder.group({
      name: new FormControl(
        '', [ Validators.required ]
      ),
      mail: new FormControl(
        '', [ Validators.required, Validators.pattern(this.validationPattern.mail) ]
      ),
      comment: new FormControl(
        '', [ Validators.required ]
      )
    });
  }

  commentData(): void {
    this.isFormSubmitted = true;
    if(this.contactUsForm.invalid) {
      return;
    }
  }

}
