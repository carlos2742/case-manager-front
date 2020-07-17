import {Action} from "@ngrx/store";

export enum USER_ACTION_TYPES {
  LOAD_USERS = '[User] Load Users',
  LOAD_USERS_SUCCESS = '[User] Load Users Success',
  LOAD_USERS_FAIL = '[User] Load Users Fail',
  REGISTER_USER = '[User] Register User',
  REGISTER_USER_SUCCESS = '[User] Register User Success',
  REGISTER_USER_FAIL = '[User] Register User Fail',
  UPDATE_USER = '[User] Update User',
  UPDATE_USER_SUCCESS = '[User] Update User Success',
  UPDATE_USER_FAIL = '[User] Update User Fail',
  DELETE_USER = '[User] Delete User',
  DELETE_USER_SUCCESS = '[User] Delete User Success',
  DELETE_USER_FAIL = '[User] Delete User Fail'
}

export class LoadUsers implements Action {
  readonly type = USER_ACTION_TYPES.LOAD_USERS;
  constructor(public payload: any) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = USER_ACTION_TYPES.LOAD_USERS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadUsersFail implements Action {
  readonly type = USER_ACTION_TYPES.LOAD_USERS_FAIL;
  constructor(public payload: any) {}
}

export class RegisterUser implements Action {
  readonly type = USER_ACTION_TYPES.REGISTER_USER;
  constructor(public payload: any) {}
}

export class RegisterUserSuccess implements Action {
  readonly type = USER_ACTION_TYPES.REGISTER_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class RegisterUserFail implements Action {
  readonly type = USER_ACTION_TYPES.REGISTER_USER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateUser implements Action {
  readonly type = USER_ACTION_TYPES.UPDATE_USER;
  constructor(public payload: any) {}
}

export class UpdateUserSuccess implements Action {
  readonly type = USER_ACTION_TYPES.UPDATE_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateUserFail implements Action {
  readonly type = USER_ACTION_TYPES.UPDATE_USER_FAIL;
  constructor(public payload: any) {}
}

export class DeleteUser implements Action {
  readonly type = USER_ACTION_TYPES.DELETE_USER;
  constructor(public payload: any) {}
}

export class DeleteUserSuccess implements Action {
  readonly type = USER_ACTION_TYPES.DELETE_USER_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteUserFail implements Action {
  readonly type = USER_ACTION_TYPES.DELETE_USER_FAIL;
  constructor(public payload: any) {}
}

export type UserActions =
  LoadUsers |
  LoadUsersSuccess |
  LoadUsersFail |
  RegisterUser |
  RegisterUserSuccess |
  RegisterUserFail |
  UpdateUser |
  UpdateUserSuccess |
  UpdateUserFail |
  DeleteUser |
  DeleteUserSuccess |
  DeleteUserFail;
