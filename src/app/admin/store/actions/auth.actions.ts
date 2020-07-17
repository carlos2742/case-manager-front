import {Action} from "@ngrx/store";

export enum AUTH_ACTION_TYPES {
  SIGN_IN = '[Auth] Sign in',
  SIGN_IN_SUCCESS = '[Auth] Sign in Success',
  SIGN_IN_FAIL = '[Auth] Sign in Fail',
  SIGN_OUT = '[Auth] Sign out',
  SIGN_OUT_SUCCESS = '[Auth] Sign out Success',
  SIGN_OUT_FAIL = '[Auth] Sign out Fail'
}

export class SignIn implements Action {
  readonly type = AUTH_ACTION_TYPES.SIGN_IN;
  constructor(public payload: any) {}
}

export class SignInSuccess implements Action {
  readonly type = AUTH_ACTION_TYPES.SIGN_IN_SUCCESS;
  constructor(public payload: any) {}
}

export class SignInFail implements Action {
  readonly type = AUTH_ACTION_TYPES.SIGN_IN_FAIL;
  constructor(public payload: any) {}
}

export class SignOut implements Action {
  readonly type = AUTH_ACTION_TYPES.SIGN_OUT;
}

export class SignOutSuccess implements Action {
  readonly type = AUTH_ACTION_TYPES.SIGN_OUT_SUCCESS;
  constructor(public payload: any) {}
}

export class SignOutFail implements Action {
  readonly type = AUTH_ACTION_TYPES.SIGN_OUT_FAIL;
  constructor(public payload: any) {}
}

export type AuthActions =
  SignIn |
  SignInSuccess |
  SignInFail |
  SignOut |
  SignOutSuccess |
  SignOutFail;
