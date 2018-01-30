import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ClientProjectComponent } from 'app/client/component/client-project/client-project.component';
import { AuthGuard } from 'shared/guard/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { ClientProjectFormComponent } from './component/client-project-form/client-project-form.component';
import { ClientAuthGuard } from './guard/client-auth-guard.service';

@NgModule({
  imports: [
    NgxDatatableModule,
    NgbModule.forRoot(),
    RouterModule.forChild([
      { path: 'client/projects/add', component: ClientProjectFormComponent, canActivate: [AuthGuard, ClientAuthGuard] },
      { path: 'client/projects/:id', component: ClientProjectFormComponent, canActivate: [AuthGuard, ClientAuthGuard] },
      { path: 'client/projects', component: ClientProjectComponent, canActivate: [AuthGuard, ClientAuthGuard] }
    ]),
    SharedModule
  ],
  declarations: [
    ClientProjectComponent,
    ClientProjectFormComponent
  ],
  providers: [
    ClientAuthGuard
  ]
})
export class ClientModule { }
