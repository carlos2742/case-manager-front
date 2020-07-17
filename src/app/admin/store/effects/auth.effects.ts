import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromAuth from "../actions/auth.actions"
import {AuthenticationService} from "../../services/auth/authentication.service";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private auth: AuthenticationService) {}

  @Effect()
  signIn$ = this.actions$
    .pipe(
      ofType(fromAuth.AUTH_ACTION_TYPES.SIGN_IN),
      map((action: fromAuth.SignIn) => action.payload),
      switchMap((payload) => {
        return this.auth.signIn(payload).pipe(
          map(response => new fromAuth.SignInSuccess(response)),
          catchError(error => of(new fromAuth.SignInFail(error)))
        );
      })
    );

  @Effect()
  signOut$ = this.actions$
    .pipe(
      ofType(fromAuth.AUTH_ACTION_TYPES.SIGN_OUT),
      switchMap((payload) => {
        return this.auth.signOut().pipe(
          map(response => new fromAuth.SignOutSuccess(response)),
          catchError(error => of(new fromAuth.SignOutFail(error)))
        );
      })
    );
}
