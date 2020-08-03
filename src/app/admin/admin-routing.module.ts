import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {LoginComponent} from "./components/login/login.component";
import {ClientComponent} from "./components/client/client.component";
import {UserComponent} from "./components/user/user.component";
import {GuardService} from "./services/auth/guard.service";
import {USER_ROLES} from "./models/admin.models";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent},
      {
        path: 'clients',
        component: ClientComponent,
        canActivate: [GuardService],
        data: {
          roles: [USER_ROLES.ADMIN, USER_ROLES.DEVELOPER, USER_ROLES.COLLABORATOR]
        }
      },
      {
        path: 'users',
        component: UserComponent,
        canActivate: [GuardService],
        data: {
          roles: [USER_ROLES.ADMIN, USER_ROLES.DEVELOPER]
        }
      },
      {
        path: '401',
        component: UnauthorizedComponent,
        canActivate: [GuardService],
        data: {
          roles: [USER_ROLES.ADMIN, USER_ROLES.DEVELOPER, USER_ROLES.COLLABORATOR]
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
