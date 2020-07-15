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


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    ClientComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatDialogModule,
    MatInputModule,
  ],
  providers:[
    ClientService
  ]
})
export class AdminModule { }
