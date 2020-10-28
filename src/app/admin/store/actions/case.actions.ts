import {Action} from "@ngrx/store";

export enum CASE_ACTION_TYPES {
  LOAD_CASES = '[Case] Load Cases',
  LOAD_CASES_SUCCESS = '[Case] Load Cases Success',
  LOAD_CASES_FAIL = '[Case] Load Cases Fail',
  CREATE_CASE = '[Case] Create Cases',
  CREATE_CASE_SUCCESS = '[Case] Create Cases Success',
  CREATE_CASE_FAIL = '[Case] Create Cases Fail',
  UPDATE_CASE = '[Case] Update Cases',
  UPDATE_CASE_SUCCESS = '[Case] Update Cases Success',
  UPDATE_CASE_FAIL = '[Case] Update Cases Fail',
  DELETE_CASE = '[Case] Delete Cases',
  DELETE_CASE_SUCCESS = '[Case] Delete Cases Success',
  DELETE_CASE_FAIL = '[Case] Delete Cases Fail',
  LOAD_CASE_CLIENTS = '[Case] Load Clients',
  LOAD_CASE_CLIENTS_SUCCESS = '[Case] Load Clients Success',
  LOAD_CASE_CLIENTS_FAIL = '[Case] Load Clients Fail',
}

export class LoadCases implements Action {
  readonly type = CASE_ACTION_TYPES.LOAD_CASES;
  constructor(public payload: any) {}
}

export class LoadCasesSuccess implements Action {
  readonly type = CASE_ACTION_TYPES.LOAD_CASES_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCasesFail implements Action {
  readonly type = CASE_ACTION_TYPES.LOAD_CASES_FAIL;
  constructor(public payload: any) {}
}

export class CreateCase implements Action {
  readonly type = CASE_ACTION_TYPES.CREATE_CASE;
  constructor(public payload: any) {}
}

export class CreateCaseSuccess implements Action {
  readonly type = CASE_ACTION_TYPES.CREATE_CASE_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateCaseFail implements Action {
  readonly type = CASE_ACTION_TYPES.CREATE_CASE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCase implements Action {
  readonly type = CASE_ACTION_TYPES.UPDATE_CASE;
  constructor(public payload: any) {}
}

export class UpdateCaseSuccess implements Action {
  readonly type = CASE_ACTION_TYPES.UPDATE_CASE_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateCaseFail implements Action {
  readonly type = CASE_ACTION_TYPES.UPDATE_CASE_FAIL;
  constructor(public payload: any) {}
}

export class DeleteCase implements Action {
  readonly type = CASE_ACTION_TYPES.DELETE_CASE;
  constructor(public payload: any) {}
}

export class DeleteCaseSuccess implements Action {
  readonly type = CASE_ACTION_TYPES.DELETE_CASE_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteCaseFail implements Action {
  readonly type = CASE_ACTION_TYPES.DELETE_CASE_FAIL;
  constructor(public payload: any) {}
}

export class LoadCaseClient implements Action {
  readonly type = CASE_ACTION_TYPES.LOAD_CASE_CLIENTS;
  constructor(public payload: any) {}
}

export class LoadCaseClientSuccess implements Action {
  readonly type = CASE_ACTION_TYPES.LOAD_CASE_CLIENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadCaseClientFail implements Action {
  readonly type = CASE_ACTION_TYPES.LOAD_CASE_CLIENTS_FAIL;
  constructor(public payload: any) {}
}

export type CaseActions =
  LoadCases |
  LoadCasesSuccess |
  LoadCasesFail |
  CreateCase |
  CreateCaseSuccess |
  CreateCaseFail|
  UpdateCase |
  UpdateCaseSuccess |
  UpdateCaseFail |
  DeleteCase |
  DeleteCaseSuccess |
  DeleteCaseFail |
  LoadCaseClient |
  LoadCaseClientSuccess |
  LoadCaseClientFail;
