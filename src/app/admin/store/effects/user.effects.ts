import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromUser from "../actions/user.actions"
import {UserService} from "../../services/user/user.service";
import {Utils} from "./utils";
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Injectable()
export class UserEffects extends Utils{
  constructor(private _actions$: Actions, private _user: UserService, private _notification: NotificationService) {
    super();
  }

  @Effect()
  loadUsers$ = this._actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.LOAD_USERS),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this._user.all.pipe(
          map(response => new fromUser.LoadUsersSuccess(response)),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            return of(new fromUser.LoadUsersFail(error));
          })
        );
      })
    );

  @Effect()
  registerUser$ = this._actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.REGISTER_USER),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this._user.register(payload).pipe(
          map(response =>{
            this._notification.success('USER.NOTIFICATIONS.SUCCESS.CREATE');
            return new fromUser.RegisterUserSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            this._notification.error('USER.NOTIFICATIONS.FAIL.CREATE');
            return of(new fromUser.RegisterUserFail(error));
          })
        );
      })
    );

  @Effect()
  updateUser$ = this._actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.UPDATE_USER),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this._user.update(payload).pipe(
          map(response =>{
            this._notification.success('USER.NOTIFICATIONS.SUCCESS.EDIT');
            return new fromUser.UpdateUserSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            this._notification.error('USER.NOTIFICATIONS.FAIL.EDIT');
            return of(new fromUser.UpdateUserFail(error));
          })
        );
      })
    );

  @Effect()
  deleteUser$ = this._actions$
    .pipe(
      ofType(fromUser.USER_ACTION_TYPES.DELETE_USER),
      map((action: fromUser.UserActions) => action.payload),
      switchMap((payload) => {
        return this._user.delete(payload).pipe(
          map(response =>{
            this._notification.success('USER.NOTIFICATIONS.SUCCESS.DELETE');
            return new fromUser.DeleteUserSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            this._notification.error('USER.NOTIFICATIONS.FAIL.DELETE');
            return of(new fromUser.DeleteUserFail(error));
          })
        );
      })
    );
}
