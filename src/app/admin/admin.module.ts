import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import {SharedModule} from "../shared/shared.module";
import { LoginComponent } from './components/login/login.component';
import { ClientComponent } from './components/client/client.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {ClientService} from "./services/client/client.service";
import { UserComponent } from './components/user/user.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { reducers, effects } from './store';
import { IsAllowDirective } from './directives/is-allow/is-allow.directive';
import { NotFoundComponent } from '../admin/components/not-found/not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { CaseComponent } from './components/case/case.component';

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ClientComponent,
    UserComponent,
    IsAllowDirective,
    NotFoundComponent,
    UnauthorizedComponent,
    CaseComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
    StoreModule.forFeature('admin', reducers),
    EffectsModule.forFeature(effects)
  ],
  exports: [
    IsAllowDirective
  ],
  providers: [
    ClientService
  ]
})
export class AdminModule { }
