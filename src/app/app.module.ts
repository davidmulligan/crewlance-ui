import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ClientModule } from 'app/client/client.module';
import { HomeComponent } from 'app/core/component/home/home.component';
import { UserRegistrationFormComponent } from 'app/core/component/user-registration-form/user-registration-form.component';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/component/login/login.component';
import { CoreModule } from './core/core.module';
import { FreelancerModule } from './freelancer/freelancer.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: UserRegistrationFormComponent },
      { path: '**', redirectTo: '' }
    ]),
    SharedModule,
    AdminModule,
    ClientModule,
    FreelancerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
