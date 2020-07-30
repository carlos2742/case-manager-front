import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromAuth from "../actions/auth.actions"
import {AuthenticationService} from "../../services/auth/authentication.service";
import {Utils} from "./utils";
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Injectable()
export class AuthEffects extends Utils{
  constructor(private _actions$: Actions, private _auth: AuthenticationService, private _notification: NotificationService) {
    super();
  }

  @Effect()
  signIn$ = this._actions$
    .pipe(
      ofType(fromAuth.AUTH_ACTION_TYPES.SIGN_IN),
      map((action: fromAuth.SignIn) => action.payload),
      switchMap((payload) => {
        return this._auth.signIn(payload).pipe(
          map(response => new fromAuth.SignInSuccess(response)),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            this._notification.error(`NOTIFICATIONS.${error}`);
            return of(new fromAuth.SignInFail(error))
          })
        );
      })
    );

  @Effect()
  getLoggedUser$ = this._actions$
    .pipe(
          ofType(fromAuth.AUTH_ACTION_TYPES.GET_LOGGED_USER),
      switchMap(() => {
        return this._auth.loggedUser.pipe(
          map(response => new fromAuth.GetLoggedUserSuccess(response)),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            return of(new fromAuth.GetLoggedUserFail(error))
          })
        );
      })
    );

  @Effect()
  signOut$ = this._actions$
    .pipe(
      ofType(fromAuth.AUTH_ACTION_TYPES.SIGN_OUT),
      switchMap((payload) => {
        return this._auth.signOut().pipe(
          map(response => new fromAuth.SignOutSuccess(response)),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            return of(new fromAuth.SignOutFail(error))
          })
        );
      })
    );
}
