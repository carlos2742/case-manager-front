import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromClient from "../actions/client.actions"
import {ClientService} from "../../services/client/client.service";
import {Utils} from "./utils";
import {NotificationService} from "../../../shared/services/notification/notification.service";

@Injectable()
export class ClientEffects extends Utils{
  constructor(private _actions$: Actions, private _client: ClientService, private _notification: NotificationService) {
    super();
  }

  @Effect()
  loadClients$ = this._actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this._client.list.pipe(
          map(response => new fromClient.LoadClientsSuccess(response)),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            return of(new fromClient.LoadClientsFail(error));
          })
        );
      })
    );

  @Effect()
  createClient$ = this._actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this._client.create(payload).pipe(
          map(response => {
            this._notification.success('CLIENT.NOTIFICATIONS.SUCCESS.CREATE');
            return new fromClient.CreateClientSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            this._notification.error('CLIENT.NOTIFICATIONS.FAIL.CREATE');
            return of(new fromClient.CreateClientFail(error));
          })
        );
      })
    );

  @Effect()
  updateClient$ = this._actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.UPDATE_CLIENT),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this._client.update(payload).pipe(
          map(response => {
            this._notification.success('CLIENT.NOTIFICATIONS.SUCCESS.EDIT');
            return new fromClient.UpdateClientSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            this._notification.error('CLIENT.NOTIFICATIONS.FAIL.EDIT');
            return of(new fromClient.UpdateClientFail(error));
          })
        );
      })
    );

  @Effect()
  deleteClient$ = this._actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this._client.delete(payload).pipe(
          map(response =>{
            this._notification.success('CLIENT.NOTIFICATIONS.SUCCESS.DELETE');
            return new fromClient.DeleteClientSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            this._notification.error('CLIENT.NOTIFICATIONS.FAIL.DELETE');
            return of(new fromClient.DeleteClientFail(error));
          })
        );
      })
    );
}
