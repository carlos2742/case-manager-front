import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from "@ngrx/store";
import * as AdminStore from "../../store";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {IUser} from "../../models/admin.models";
import {AuthenticationService} from "./authentication.service";

enum GUARD_STATUS{
  ALLOWED = 'ALLOWED',
  UNAUTHORIZED = 'UNAUTHORIZED',
  UNAUTHENTICATED = 'UNAUTHENTICATED',
}
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(private store: Store<AdminStore.AdminState>, private auth: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.allowCurrentUser(route);
  }

  private allowCurrentUser(route: ActivatedRouteSnapshot): Observable<boolean>{
    return new Observable<boolean>(observe => {
      this.auth.loggedUser.pipe(
        switchMap((loggedUser: IUser) =>{
          if(!loggedUser){
            this.action(observe, GUARD_STATUS.UNAUTHENTICATED);
            return of(GUARD_STATUS.UNAUTHENTICATED);
          } else {
            const requiredRoles = route.data.roles;
            if(!requiredRoles || requiredRoles.length === 0 || requiredRoles.indexOf(loggedUser.rol) > -1){
              this.action(observe, GUARD_STATUS.ALLOWED);
            } else {
              this.action(observe, GUARD_STATUS.UNAUTHORIZED);
            }
            return of(GUARD_STATUS.UNAUTHORIZED);
          }
        }),
        catchError(error => {
          console.log(error);
          this.action(observe, GUARD_STATUS.UNAUTHENTICATED);
          return of(GUARD_STATUS.UNAUTHENTICATED);
        })
      ).subscribe();
    });
  }

  private action(observe, status: GUARD_STATUS){
    observe.next(status === GUARD_STATUS.ALLOWED ? true : false);
    observe.complete();
    this.store.dispatch(new AdminStore.GetLoggedUser());

    switch(status){
      case GUARD_STATUS.UNAUTHENTICATED:{
        this.router.navigateByUrl('admin/login');
        return;
      }
      case GUARD_STATUS.UNAUTHORIZED:  {
        this.router.navigateByUrl('admin/401');
        return;
      }
    }
  }

}
