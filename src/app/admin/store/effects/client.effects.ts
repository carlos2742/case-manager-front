import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromClient from "../actions/client.actions"
import {ClientService} from "../../services/client/client.service";

@Injectable()
export class ClientEffects {
  constructor(private actions$: Actions, private client: ClientService) {}

  @Effect()
  loadClients$ = this.actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this.client.all.pipe(
          map(response => new fromClient.LoadClientsSuccess(response)),
          catchError(error => of(new fromClient.LoadClientsFail(error)))
        );
      })
    );

  @Effect()
  createClient$ = this.actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this.client.create(payload).pipe(
          map(response => new fromClient.CreateClientSuccess(response)),
          catchError(error => of(new fromClient.CreateClientFail(error)))
        );
      })
    );

  @Effect()
  updateClient$ = this.actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.UPDATE_CLIENT),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this.client.update(payload).pipe(
          map(response => new fromClient.UpdateClientSuccess(response)),
          catchError(error => of(new fromClient.UpdateClientFail(error)))
        );
      })
    );

  @Effect()
  deleteClient$ = this.actions$
    .pipe(
      ofType(fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT),
      map((action: fromClient.ClientActions) => action.payload),
      switchMap((payload) => {
        return this.client.delete(payload).pipe(
          map(response => new fromClient.DeleteClientSuccess(response)),
          catchError(error => of(new fromClient.DeleteClientFail(error)))
        );
      })
    );
}
