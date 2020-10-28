import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import * as fromCase from "../actions/case.actions"
import {Utils} from "./utils";
import {NotificationService} from "../../../shared/services/notification/notification.service";
import {CaseService} from "../../services/case/case.service";
import {ClientService} from "../../services/client/client.service";

@Injectable()
export class CaseEffects extends Utils{
  constructor(private _actions$: Actions, private _case: CaseService, private _client: ClientService ,private _notification: NotificationService) {
    super();
  }

  @Effect()
  loadCases$ = this._actions$
    .pipe(
      ofType(fromCase.CASE_ACTION_TYPES.LOAD_CASES),
      map((action: fromCase.CaseActions) => action.payload),
      switchMap((payload) => {
        return this._case.all.pipe(
          map(response => new fromCase.LoadCasesSuccess(response)),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            return of(new fromCase.LoadCasesFail(error));
          })
        );
      })
    );

  @Effect()
  loadCaseClients$ = this._actions$
    .pipe(
      ofType(fromCase.CASE_ACTION_TYPES.LOAD_CASE_CLIENTS),
      map((action: fromCase.CaseActions) => action.payload),
      switchMap((payload) => {
        return this._client.find(payload).pipe(
          map(response => new fromCase.LoadCaseClientSuccess(response)),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            return of(new fromCase.LoadCaseClientFail(error));
          })
        );
      })
    );

  @Effect()
  createCase$ = this._actions$
    .pipe(
      ofType(fromCase.CASE_ACTION_TYPES.CREATE_CASE),
      map((action: fromCase.CaseActions) => action.payload),
      switchMap((payload) => {
        return this._case.create(payload).pipe(
          map(response => {
            this._notification.success('CASE.NOTIFICATIONS.SUCCESS.CREATE');
            return new fromCase.CreateCaseSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            this._notification.error('CASE.NOTIFICATIONS.FAIL.CREATE');
            return of(new fromCase.CreateCaseFail(error));
          })
        );
      })
    );

  @Effect()
  updateCase$ = this._actions$
    .pipe(
      ofType(fromCase.CASE_ACTION_TYPES.UPDATE_CASE),
      map((action: fromCase.CaseActions) => action.payload),
      switchMap((payload) => {
        return this._case.update(payload).pipe(
          map(response => {
            this._notification.success('CASE.NOTIFICATIONS.SUCCESS.EDIT');
            return new fromCase.UpdateCaseSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            this._notification.error('CASE.NOTIFICATIONS.FAIL.EDIT');
            return of(new fromCase.UpdateCaseFail(error));
          })
        );
      })
    );

  @Effect()
  deleteCase$ = this._actions$
    .pipe(
      ofType(fromCase.CASE_ACTION_TYPES.DELETE_CASE),
      map((action: fromCase.CaseActions) => action.payload),
      switchMap((payload) => {
        return this._case.delete(payload).pipe(
          map(response =>{
            this._notification.success('CASE.NOTIFICATIONS.SUCCESS.DELETE');
            return new fromCase.DeleteCaseSuccess(response);
          }),
          catchError(errors => {
            const error = this.extractErrorMessage(errors);
            console.log(error);
            this._notification.error('CASE.NOTIFICATIONS.FAIL.DELETE');
            return of(new fromCase.DeleteCaseFail(error));
          })
        );
      })
    );
}
