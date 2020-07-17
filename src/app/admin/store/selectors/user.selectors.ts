import * as fromUser from '../reducers/user.reducers';
import * as fromFeature from '../reducers';

import {createSelector} from '@ngrx/store';

const getAdminState = createSelector(fromFeature.getAdminState, (state: fromFeature.AdminState) => state.users);

export const allUsers = createSelector(getAdminState, fromUser.getUserItems);
export const isUsersLoading = createSelector(getAdminState, fromUser.getUsersLoading);
export const isUserLoaded = createSelector(getAdminState, fromUser.getUsersLoaded);

export const isRegisteringUser = createSelector(getAdminState, fromUser.getRegisterUserOngoing);
export const isRegisterUserSuccess = createSelector(getAdminState, fromUser.getRegisterUserSuccess);
export const RegisterUserError = createSelector(getAdminState, fromUser.getRegisterUserError);

export const isUpdatingUser = createSelector(getAdminState, fromUser.getUpdateUserOngoing);
export const isUpdateUserSuccess = createSelector(getAdminState, fromUser.getUpdateUserSuccess);
export const updateUserError = createSelector(getAdminState, fromUser.getUpdateUserError);

export const isDeletingUser = createSelector(getAdminState, fromUser.getDeleteUserOngoing);
export const isDeleteUserSuccess = createSelector(getAdminState, fromUser.getDeleteUserSuccess);
export const DeleteUserError = createSelector(getAdminState, fromUser.getDeleteUserError);

