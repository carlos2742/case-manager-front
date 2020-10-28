import {IClient} from '../../models/admin.models'
import * as fromClient from '../actions/client.actions'

export interface State {
  entities: {
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
  action: fromClient.ClientActions
): State {
  switch (action.type) {
    case fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS: {
      console.log(fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS);
      return {
        ...state,
        entities:{
          ...state.entities,
          loading: true,
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS_SUCCESS: {
      console.log(fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS_SUCCESS);
      return {
        ...state,
        entities:{
          items: action.payload,
          loaded: true,
          loading: false
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS_FAIL: {
      console.log(fromClient.CLIENT_ACTION_TYPES.LOAD_CLIENTS_FAIL);
      return {
        ...state,
        entities:{
          ...state.entities,
          loaded: false,
          loading: false,
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT: {
      console.log(fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT);
      return {
        ...state,
        create: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT_SUCCESS: {
      console.log(fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT_SUCCESS);
      return {
        ...state,
        create:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT_FAIL: {
      console.log(fromClient.CLIENT_ACTION_TYPES.CREATE_CLIENT_FAIL);
      return {
        ...state,
        create:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.UPDATE_CLIENT: {
      console.log(fromClient.CLIENT_ACTION_TYPES.UPDATE_CLIENT);
      return {
        ...state,
        update: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.UPDATE_CLIENT_SUCCESS: {
      console.log(fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT_SUCCESS);
      return {
        ...state,
        update:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.UPDATE_CLIENT_FAIL: {
      console.log(fromClient.CLIENT_ACTION_TYPES.UPDATE_CLIENT_FAIL);
      return {
        ...state,
        update:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT: {
      console.log(fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT);
      return {
        ...state,
        delete: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT_SUCCESS: {
      console.log(fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT_SUCCESS);
      return {
        ...state,
        delete:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT_FAIL: {
      console.log(fromClient.CLIENT_ACTION_TYPES.DELETE_CLIENT_FAIL);
      return {
        ...state,
        delete:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getClientItems = (state: State) => state.entities.items;
export const getClientsLoaded = (state: State) => state.entities.loaded;
export const getClientsLoading = (state: State) => state.entities.loading;

export const getCreateClientOngoing = (state: State) => state.create.ongoing;
export const getCreateClientSuccess = (state: State) => state.create.success;
export const getCreateClientError = (state: State) => state.create.error;

export const getUpdateClientOngoing = (state: State) => state.update.ongoing;
export const getUpdateClientSuccess = (state: State) => state.update.success;
export const getUpdateClientError = (state: State) => state.update.error;

export const getDeleteClientOngoing = (state: State) => state.delete.ongoing;
export const getDeleteClientSuccess = (state: State) => state.delete.success;
export const getDeleteClientError = (state: State) => state.delete.error;



