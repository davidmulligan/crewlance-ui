import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TruncateModule } from 'ng2-truncate';
import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from 'shared/guard/auth-guard.service';
import { CategoryService } from 'shared/service/category.service';
import { SkillService } from 'shared/service/skill.service';
import { UserService } from 'shared/service/user.service';

import { ProjectDetailComponent } from './component/project-detail/project-detail.component';
import { ValidateEqualDirective } from './directive/validate-equal.directive';
import { AuthService } from './service/auth.service';
import { ProjectService } from './service/project.service';
import { RoleService } from './service/role.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    CustomFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    TruncateModule
  ],
  declarations: [
    ProjectDetailComponent,
    ValidateEqualDirective
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    CustomFormsModule,
    FormsModule,
    NgbModule.forRoot().ngModule,
    ToastrModule.forRoot().ngModule,
    TruncateModule,
    ProjectDetailComponent,
    ValidateEqualDirective
  ],
  providers: [
    AuthService,
    CategoryService,
    ProjectService,
    RoleService,
    SkillService,
    UserService,
    AuthGuard
  ]
})
export class SharedModule { }
