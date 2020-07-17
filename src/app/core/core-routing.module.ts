import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/admin/clients',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    loadChildren: () => import('../admin/admin.module').then( mod => mod.AdminModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
