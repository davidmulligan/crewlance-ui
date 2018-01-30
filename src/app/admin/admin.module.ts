import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdminCategoryModalComponent } from 'app/admin/component/admin-category-modal/admin-category-modal.component';
import { AdminCategoryComponent } from 'app/admin/component/admin-category/admin-category.component';
import { AdminAuthGuard } from 'app/admin/guard/admin-auth-guard.service';
import { AuthGuard } from 'shared/guard/auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { AdminProjectComponent } from './component/admin-project/admin-project.component';
import { AdminSkillModalComponent } from './component/admin-skill-modal/admin-skill-modal.component';
import { AdminSkillComponent } from './component/admin-skill/admin-skill.component';
import { AdminUserModalComponent } from './component/admin-user-modal/admin-user-modal.component';
import { AdminUserComponent } from './component/admin-user/admin-user.component';

@NgModule({
  imports: [
    NgxDatatableModule,
    NgbModule.forRoot(),
    RouterModule.forChild([
      { path: 'admin/categories', component: AdminCategoryComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/skills', component: AdminSkillComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/projects', component: AdminProjectComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/users', component: AdminUserComponent, canActivate: [AuthGuard, AdminAuthGuard] }
    ]),
    SharedModule
  ],
  declarations: [
    AdminCategoryComponent,
    AdminCategoryModalComponent,
    AdminProjectComponent,
    AdminSkillComponent,
    AdminSkillModalComponent,
    AdminUserComponent,
    AdminUserModalComponent
  ],
  entryComponents: [
    AdminCategoryModalComponent,
    AdminSkillModalComponent,
    AdminUserModalComponent
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
