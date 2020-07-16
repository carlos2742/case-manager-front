import {ActionReducerMap, createFeatureSelector} from "@ngrx/store";
import * as Client from './client.reducers';

export interface AdminState {
  clients: Client.State;
}

export const reducers: ActionReducerMap<AdminState> = {
  clients: Client.reducer
};

export const getAdminState = createFeatureSelector<AdminState>(
  'admin'
);
