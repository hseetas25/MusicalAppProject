import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  HomeComponent,
  LoginComponent,
  PageNotFoundComponent,
  RegisterComponent,
} from './components';

const routes: Routes = [
{ path: 'contact-us', loadChildren: () => import('./components/contact-us/contact-us.module').then(m => m.ContactUsModule) },
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{path: 'register', component: RegisterComponent},
{path: 'login' , component: LoginComponent},
{path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule {
  static components = [
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
  ]
}
