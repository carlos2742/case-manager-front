import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as Client from './client.reducers';
import * as User from './user.reducers';

export interface AdminState {
  clients: Client.State;
  users: User.State;
}

export const reducers: ActionReducerMap<AdminState> = {
  clients: Client.reducer,
  users: User.reducer,
};

export const getAdminState = createFeatureSelector<AdminState>(
  'admin'
);
