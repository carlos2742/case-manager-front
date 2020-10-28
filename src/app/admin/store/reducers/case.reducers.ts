import {ICase, IClient} from '../../models/admin.models'
import * as fromCase from '../actions/case.actions'

export interface State {
  entities: {
    items: Array<ICase>;
    loaded: boolean;
    loading: boolean;
  };
  clients:{
    items: Array<IClient>;
    loaded: boolean;
    loading: boolean;
  };
  create: {
    ongoing: boolean,
    success: boolean,
    error: string
  };
  update: {
    ongoing: boolean,
    success: boolean,
    error: string
  };
  delete: {
    ongoing: boolean,
    success: boolean,
    error: string
  };
};

export const initialState: State = {
  entities: {
    items:[],
    loaded: false,
    loading: false
  },
  clients:{
    items: [],
    loaded: false,
    loading: false
  },
  create: {
    ongoing: false,
    success: false,
    error: ''
  },
  update: {
    ongoing: false,
    success: false,
    error: ''
  },
  delete: {
    ongoing: false,
    success: false,
    error: ''
  }
};

export function reducer(
  state = initialState,
  action: fromCase.CaseActions
): State {
  switch (action.type) {
    case fromCase.CASE_ACTION_TYPES.LOAD_CASES: {
      console.log(fromCase.CASE_ACTION_TYPES.LOAD_CASES);
      return {
        ...state,
        entities:{
          ...state.entities,
          loading: true,
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.LOAD_CASES_SUCCESS: {
      console.log(fromCase.CASE_ACTION_TYPES.LOAD_CASES_SUCCESS);
      return {
        ...state,
        entities:{
          items: action.payload,
          loaded: true,
          loading: false
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.LOAD_CASES_FAIL: {
      console.log(fromCase.CASE_ACTION_TYPES.LOAD_CASES_FAIL);
      return {
        ...state,
        entities:{
          ...state.entities,
          loaded: false,
          loading: false,
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.CREATE_CASE: {
      console.log(fromCase.CASE_ACTION_TYPES.CREATE_CASE);
      return {
        ...state,
        create: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.CREATE_CASE_SUCCESS: {
      console.log(fromCase.CASE_ACTION_TYPES.CREATE_CASE_SUCCESS);
      return {
        ...state,
        create:{
          ...state.create,
          ongoing:false,
          success: true
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.CREATE_CASE_FAIL: {
      console.log(fromCase.CASE_ACTION_TYPES.CREATE_CASE_FAIL);
      return {
        ...state,
        create:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.UPDATE_CASE: {
      console.log(fromCase.CASE_ACTION_TYPES.UPDATE_CASE);
      return {
        ...state,
        update: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.UPDATE_CASE_SUCCESS: {
      console.log(fromCase.CASE_ACTION_TYPES.UPDATE_CASE_SUCCESS);
      return {
        ...state,
        update:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.UPDATE_CASE_FAIL: {
      console.log(fromCase.CASE_ACTION_TYPES.UPDATE_CASE_FAIL);
      return {
        ...state,
        update:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.DELETE_CASE: {
      console.log(fromCase.CASE_ACTION_TYPES.DELETE_CASE);
      return {
        ...state,
        delete: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.DELETE_CASE_SUCCESS: {
      console.log(fromCase.CASE_ACTION_TYPES.DELETE_CASE_SUCCESS);
      return {
        ...state,
        delete:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.DELETE_CASE_FAIL: {
      console.log(fromCase.CASE_ACTION_TYPES.DELETE_CASE_FAIL);
      return {
        ...state,
        delete:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.LOAD_CASE_CLIENTS: {
      console.log(fromCase.CASE_ACTION_TYPES.LOAD_CASE_CLIENTS);
      return {
        ...state,
        clients:{
          ...state.clients,
          loading: true
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.LOAD_CASE_CLIENTS_SUCCESS: {
      console.log(fromCase.CASE_ACTION_TYPES.LOAD_CASE_CLIENTS_SUCCESS);
      return {
        ...state,
        clients:{
          items: action.payload,
          loading: false,
          loaded: true
        }
      };
    }
    case fromCase.CASE_ACTION_TYPES.LOAD_CASE_CLIENTS_FAIL: {
      console.log(fromCase.CASE_ACTION_TYPES.LOAD_CASE_CLIENTS_FAIL);
      return {
        ...state,
        clients:{
          ...state.clients,
          loading: false,
          loaded: false
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getCaseItems = (state: State) => state.entities.items;
export const getCasesLoaded = (state: State) => state.entities.loaded;
export const getCasesLoading = (state: State) => state.entities.loading;

export const getClients = (state: State) => state.clients.items;
export const getClientsLoaded = (state: State) => state.clients.loaded;
export const getClientLoading = (state: State) => state.clients.loading;

export const getCreateCaseOngoing = (state: State) => state.create.ongoing;
export const getCreateCaseSuccess = (state: State) => state.create.success;
export const getCreateCaseError = (state: State) => state.create.error;

export const getUpdateCaseOngoing = (state: State) => state.update.ongoing;
export const getUpdateCaseSuccess = (state: State) => state.update.success;
export const getUpdateCaseError = (state: State) => state.update.error;

export const getDeleteCaseOngoing = (state: State) => state.delete.ongoing;
export const getDeleteCaseSuccess = (state: State) => state.delete.success;
export const getDeleteCaseError = (state: State) => state.delete.error;



