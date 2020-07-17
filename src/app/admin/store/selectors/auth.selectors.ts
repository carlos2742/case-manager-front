import * as fromAuth from '../reducers/auth.reducers';
import * as fromFeature from '../reducers';

import {createSelector} from '@ngrx/store';

const getAdminState = createSelector(fromFeature.getAdminState, (state: fromFeature.AdminState) => state.auth);

export const loggedUser = createSelector(getAdminState, fromAuth.getAuthUser);
export const isAuthenticate = createSelector(getAdminState, fromAuth.getAuthLogged);

export const isSignInProcessing = createSelector(getAdminState, fromAuth.getSignInOngoing);
export const isSignInSuccess = createSelector(getAdminState, fromAuth.getSignInSuccess);
export const isSignInError = createSelector(getAdminState, fromAuth.getSignInError);

export const isSignOutProcessing = createSelector(getAdminState, fromAuth.getSignOutOngoing);
export const isSignOutSuccess = createSelector(getAdminState, fromAuth.getSignOutSuccess);
export const isSignOutError = createSelector(getAdminState, fromAuth.getSignOutError);

