import * as fromCase from '../reducers/case.reducers';
import * as fromFeature from '../reducers';

import {createSelector} from '@ngrx/store';

const getAdminState = createSelector(fromFeature.getAdminState, (state: fromFeature.AdminState) => state.case);

export const allCases = createSelector(getAdminState, fromCase.getCaseItems);
export const isCasesLoading = createSelector(getAdminState, fromCase.getCasesLoading);
export const isCaseLoaded = createSelector(getAdminState, fromCase.getCasesLoaded);

export const caseClients = createSelector(getAdminState, fromCase.getClients);
export const areCaseClientsLoading = createSelector(getAdminState, fromCase.getClientLoading);
export const areCaseClientsLoaded = createSelector(getAdminState, fromCase.getClientsLoaded);

export const isCreatingCase = createSelector(getAdminState, fromCase.getCreateCaseOngoing);
export const isCreateCaseSuccess = createSelector(getAdminState, fromCase.getCreateCaseSuccess);
export const CreateCaseError = createSelector(getAdminState, fromCase.getCreateCaseError);

export const isUpdatingCase = createSelector(getAdminState, fromCase.getUpdateCaseOngoing);
export const isUpdateCaseSuccess = createSelector(getAdminState, fromCase.getUpdateCaseSuccess);
export const updateCaseError = createSelector(getAdminState, fromCase.getUpdateCaseError);

export const isDeletingCase = createSelector(getAdminState, fromCase.getDeleteCaseOngoing);
export const isDeleteCaseSuccess = createSelector(getAdminState, fromCase.getDeleteCaseSuccess);
export const DeleteCaseError = createSelector(getAdminState, fromCase.getDeleteCaseError);

