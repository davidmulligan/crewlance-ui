import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from 'app/core/component/header/header.component';
import { HomeComponent } from 'app/core/component/home/home.component';
import { LoginComponent } from 'app/core/component/login/login.component';
import { AuthGuard } from 'shared/guard/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { ProfileFormComponent } from './component/profile-form/profile-form.component';
import { UserRegistrationFormComponent } from './component/user-registration-form/user-registration-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'profile', component: ProfileFormComponent, canActivate: [AuthGuard] },
    ]),
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    ProfileFormComponent,
    UserRegistrationFormComponent
  ],
  exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
