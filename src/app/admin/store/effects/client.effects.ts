import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as Client from "../actions/client.actions"
import {ClientService} from "../../services/client/client.service";

@Injectable()
export class ClientEffects {
  constructor(private actions$: Actions, private client: ClientService) {}

  @Effect()
  loadClients$ = this.actions$
    .pipe(
      ofType(Client.TYPES.LOAD_CLIENTS),
      map((action: Client.Actions) => action.payload),
      switchMap((payload) => {
        return this.client.all.pipe(
          map(response => new Client.LoadClientsSuccess(response)),
          catchError(error => of(new Client.LoadClientsFail(error)))
        );
      })
    );

  @Effect()
  createClient$ = this.actions$
    .pipe(
      ofType(Client.TYPES.CREATE_CLIENT),
      map((action: Client.Actions) => action.payload),
      switchMap((payload) => {
        return this.client.create(payload).pipe(
          map(response => new Client.CreateClientSuccess(response)),
          catchError(error => of(new Client.CreateClientFail(error)))
        );
      })
    );

  @Effect()
  updateClient$ = this.actions$
    .pipe(
      ofType(Client.TYPES.UPDATE_CLIENT),
      map((action: Client.Actions) => action.payload),
      switchMap((payload) => {
        return this.client.update(payload).pipe(
          map(response => new Client.UpdateClientSuccess(response)),
          catchError(error => of(new Client.UpdateClientFail(error)))
        );
      })
    );

  @Effect()
  deleteClient$ = this.actions$
    .pipe(
      ofType(Client.TYPES.DELETE_CLIENT),
      map((action: Client.Actions) => action.payload),
      switchMap((payload) => {
        return this.client.delete(payload).pipe(
          map(response => new Client.DeleteClientSuccess(response)),
          catchError(error => of(new Client.DeleteClientFail(error)))
        );
      })
    );
}
