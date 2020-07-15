import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {LoginComponent} from "./components/login/login.component";
import {ClientComponent} from "./components/client/client.component";
import {UserComponent} from "./components/user/user.component";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'clients'},
      {path: 'login', component: LoginComponent},
      { path: 'clients', component: ClientComponent},
      { path: 'users', component: UserComponent},
      { path: '**', redirectTo: '404'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
