import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromUser from "../actions/user.actions"
import {UserService} from "../../services/user/user.service";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private user: UserService) {}

  @Effect()
  loadUsers$ = this.actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.LOAD_USERS),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this.user.all.pipe(
          map(response => new fromUser.LoadUsersSuccess(response)),
          catchError(error => of(new fromUser.LoadUsersFail(error)))
        );
      })
    );

  @Effect()
  registerUser$ = this.actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.REGISTER_USER),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this.user.register(payload).pipe(
          map(response => new fromUser.RegisterUserSuccess(response)),
          catchError(error => of(new fromUser.RegisterUserFail(error)))
        );
      })
    );

  @Effect()
  updateUser$ = this.actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.UPDATE_USER),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this.user.update(payload).pipe(
          map(response => new fromUser.UpdateUserSuccess(response)),
          catchError(error => of(new fromUser.UpdateUserFail(error)))
        );
      })
    );

  @Effect()
  deleteUser$ = this.actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.DELETE_USER),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this.user.delete(payload).pipe(
          map(response => new fromUser.DeleteUserSuccess(response)),
          catchError(error => of(new fromUser.DeleteUserFail(error)))
        );
      })
    );
}
