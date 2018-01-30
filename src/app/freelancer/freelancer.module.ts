import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FreelancerProjectComponent } from 'app/freelancer/component/freelancer-project/freelancer-project.component';
import { AuthGuard } from 'shared/guard/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { FreelancerAuthGuard } from './guard/freelancer-auth-guard.service';

@NgModule({
  imports: [
    NgxDatatableModule,
    NgbModule.forRoot(),
    RouterModule.forChild([
      { path: 'freelancer/projects', component: FreelancerProjectComponent, canActivate: [AuthGuard, FreelancerAuthGuard] }
    ]),
    SharedModule,
  ],
  declarations: [
    FreelancerProjectComponent
  ],
  providers: [
    FreelancerAuthGuard
  ]
})
export class FreelancerModule { }
