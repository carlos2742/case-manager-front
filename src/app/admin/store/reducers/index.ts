import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as Client from './client.reducers';
import * as User from './user.reducers';
import * as Auth from './auth.reducers';

export interface AdminState {
  client: Client.State;
  user: User.State;
  auth: Auth.State;
}

export const reducers: ActionReducerMap<AdminState> = {
  client: Client.reducer,
  user: User.reducer,
  auth: Auth.reducer,
};

export const getAdminState = createFeatureSelector<AdminState>(
  'admin'
);
