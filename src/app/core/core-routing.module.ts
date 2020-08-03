import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from "../admin/components/not-found/not-found.component";


const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/clients',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( mod => mod.AdminModule),
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
