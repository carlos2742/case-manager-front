import {Action} from "@ngrx/store";

export enum TYPES {
  LOAD_CLIENTS = '[Client] Load Clients',
  LOAD_CLIENTS_SUCCESS = '[Client] Load Clients Success',
  LOAD_CLIENTS_FAIL = '[Client] Load Clients Fail',
  CREATE_CLIENT = '[Client] Create Clients',
  CREATE_CLIENT_SUCCESS = '[Client] Create Clients Success',
  CREATE_CLIENT_FAIL = '[Client] Create Clients Fail',
  UPDATE_CLIENT = '[Client] Update Clients',
  UPDATE_CLIENT_SUCCESS = '[Client] Update Clients Success',
  UPDATE_CLIENT_FAIL = '[Client] Update Clients Fail',
  DELETE_CLIENT = '[Client] Delete Clients',
  DELETE_CLIENT_SUCCESS = '[Client] Delete Clients Success',
  DELETE_CLIENT_FAIL = '[Client] Delete Clients Fail'
}

export class LoadClients implements Action {
  readonly type = TYPES.LOAD_CLIENTS;
  constructor(public payload: any) {}
}

export class LoadClientsSuccess implements Action {
  readonly type = TYPES.LOAD_CLIENTS_SUCCESS;
  constructor(public payload: any) {}
}

export class LoadClientsFail implements Action {
  readonly type = TYPES.LOAD_CLIENTS_FAIL;
  constructor(public payload: any) {}
}

export class CreateClient implements Action {
  readonly type = TYPES.CREATE_CLIENT;
  constructor(public payload: any) {}
}

export class CreateClientSuccess implements Action {
  readonly type = TYPES.CREATE_CLIENT_SUCCESS;
  constructor(public payload: any) {}
}

export class CreateClientFail implements Action {
  readonly type = TYPES.CREATE_CLIENT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateClient implements Action {
  readonly type = TYPES.UPDATE_CLIENT;
  constructor(public payload: any) {}
}

export class UpdateClientSuccess implements Action {
  readonly type = TYPES.UPDATE_CLIENT_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateClientFail implements Action {
  readonly type = TYPES.UPDATE_CLIENT_FAIL;
  constructor(public payload: any) {}
}

export class DeleteClient implements Action {
  readonly type = TYPES.DELETE_CLIENT;
  constructor(public payload: any) {}
}

export class DeleteClientSuccess implements Action {
  readonly type = TYPES.DELETE_CLIENT_SUCCESS;
  constructor(public payload: any) {}
}

export class DeleteClientFail implements Action {
  readonly type = TYPES.DELETE_CLIENT_FAIL;
  constructor(public payload: any) {}
}

export type Actions =
  LoadClients |
  LoadClientsSuccess |
  LoadClientsFail |
  CreateClient |
  CreateClientSuccess |
  CreateClientFail|
  UpdateClient |
  UpdateClientSuccess |
  UpdateClientFail |
  DeleteClient |
  DeleteClientSuccess |
  DeleteClientFail;
