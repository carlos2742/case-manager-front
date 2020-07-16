import {Action} from "@ngrx/store";

export enum UserTypes {
  LoadUsers = '[User] Load Users',
  LoadUsersFail = '[Client] Load Users Fail',
  LoadUsersSuccess = '[Client] Load Users Success',
}

export class LoadUsers implements Action {
  readonly type = UserTypes.LoadUsers;
  constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = UserTypes.LoadUsersSuccess;
  constructor(public payload: any) {}
}

export class LoadUsersFail implements Action {
  readonly type = UserTypes.LoadUsersFail;
  constructor(public payload: any) {}
}

export type UserActions = LoadUsers | LoadUsersSuccess | LoadUsersFail;
