import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule, } from '@angular/fire/auth';

import { MusicRoutingModule } from './music-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [ MusicRoutingModule.components, ForgotPasswordComponent ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ]
})
export class MusicModule { }
