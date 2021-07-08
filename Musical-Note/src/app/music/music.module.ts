import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule, } from '@angular/fire/auth';

import { MusicRoutingModule } from './music-routing.module';

@NgModule({
  declarations: [ MusicRoutingModule.components ],
  imports: [
    CommonModule,
    MusicRoutingModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
  ]
})
export class MusicModule { }
