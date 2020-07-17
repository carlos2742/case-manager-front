import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import * as AdminStore from "../../store";
import {map, switchMap, tap} from "rxjs/operators";
import {IUser} from "../../models/admin.models";


@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private store: Store<AdminStore.AdminState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable<boolean>(observe => {
      this.store.select(AdminStore.isAuthenticate).pipe(
        switchMap(isLogged =>{
          if(!isLogged){
            this.router.navigateByUrl('admin/login');
            observe.next(false);
            observe.complete();
            return new Observable<boolean>(observe => observe.next());
          } else {
            return this.store.select(AdminStore.loggedUser).pipe(
              tap((user: IUser) =>{
                const requiredRoles = route.data.roles;
                if(!requiredRoles || requiredRoles.length === 0 || requiredRoles.indexOf(user.rol) > -1){
                  observe.next(true);
                  observe.complete();
                } else {
                  // this.router.navigateByUrl('admin/401');
                  observe.next(false);
                  observe.complete();
                }
              })
            );
          }
        }),
      ).subscribe();
    });
  }
}
