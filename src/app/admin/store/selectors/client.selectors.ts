import * as fromClient from '../reducers/client.reducers';
import * as fromFeature from '../reducers';

import {createSelector} from '@ngrx/store';

const getAdminState = createSelector(fromFeature.getAdminState, (state: fromFeature.AdminState) => state.clients);

export const allClients = createSelector(getAdminState, fromClient.getClientItems);
export const isClientsLoading = createSelector(getAdminState, fromClient.getClientsLoading);
export const isClientLoaded = createSelector(getAdminState, fromClient.getClientsLoaded);

export const isCreatingClient = createSelector(getAdminState, fromClient.getCreateClientOngoing);
export const isCreateClientSuccess = createSelector(getAdminState, fromClient.getCreateClientSuccess);
export const CreateClientError = createSelector(getAdminState, fromClient.getCreateClientError);

export const isUpdatingClient = createSelector(getAdminState, fromClient.getUpdateClientOngoing);
export const isUpdateClientSuccess = createSelector(getAdminState, fromClient.getUpdateClientSuccess);
export const updateClientError = createSelector(getAdminState, fromClient.getUpdateClientError);

export const isDeletingClient = createSelector(getAdminState, fromClient.getDeleteClientOngoing);
export const isDeleteClientSuccess = createSelector(getAdminState, fromClient.getDeleteClientSuccess);
export const DeleteClientError = createSelector(getAdminState, fromClient.getDeleteClientError);

