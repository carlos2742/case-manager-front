import {IClient} from '../../models/admin.models'
import * as Client from '../actions/client.actions'

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
  action: Client.Actions
): State {
  switch (action.type) {
    case Client.TYPES.LOAD_CLIENTS: {
      console.log(Client.TYPES.LOAD_CLIENTS);
      return {
        ...state,
        entities:{
          ...state.entities,
          loading: true,
        }
      };
    }
    case Client.TYPES.LOAD_CLIENTS_SUCCESS: {
      console.log(Client.TYPES.LOAD_CLIENTS_SUCCESS);
      return {
        ...state,
        entities:{
          items: action.payload,
          loaded: true,
          loading: false
        }
      };
    }
    case Client.TYPES.LOAD_CLIENTS_FAIL: {
      console.log(Client.TYPES.LOAD_CLIENTS_FAIL);
      return {
        ...state,
        entities:{
          ...state.entities,
          loaded: false,
          loading: false,
        }
      };
    }
    case Client.TYPES.CREATE_CLIENT: {
      console.log(Client.TYPES.CREATE_CLIENT);
      return {
        ...state,
        create: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case Client.TYPES.CREATE_CLIENT_SUCCESS: {
      console.log(Client.TYPES.CREATE_CLIENT_SUCCESS);
      const items = [...state.entities.items];
      const createdItem = action.payload;
      return {
        ...state,
        entities:{
          ...state.entities,
          items: items.concat([createdItem]),
        },
        create:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case Client.TYPES.CREATE_CLIENT_FAIL: {
      console.log(Client.TYPES.CREATE_CLIENT_FAIL);
      console.log(action.payload);
      return {
        ...state,
        create:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    case Client.TYPES.UPDATE_CLIENT: {
      console.log(Client.TYPES.UPDATE_CLIENT);
      return {
        ...state,
        update: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case Client.TYPES.UPDATE_CLIENT_SUCCESS: {
      console.log(Client.TYPES.DELETE_CLIENT_SUCCESS);
      const items = [...state.entities.items];
      const updatedItem = action.payload;
      const index = items.findIndex(item => item.id === updatedItem.id);
      items.splice(index,1,updatedItem);
      return {
        ...state,
        entities:{
          ...state.entities,
          items: items,
        },
        update:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case Client.TYPES.UPDATE_CLIENT_FAIL: {
      console.log(Client.TYPES.UPDATE_CLIENT_FAIL);
      console.log(action.payload);
      return {
        ...state,
        update:{
          ...state.create,
          ongoing:false,
          error: action.payload
        }
      };
    }
    case Client.TYPES.DELETE_CLIENT: {
      console.log(Client.TYPES.DELETE_CLIENT);
      return {
        ...state,
        delete: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case Client.TYPES.DELETE_CLIENT_SUCCESS: {
      console.log(Client.TYPES.DELETE_CLIENT_SUCCESS);
      const items = [...state.entities.items];
      const deletedItem = action.payload;
      return {
        ...state,
        entities:{
          ...state.entities,
          items: items.filter(item => item.id !== deletedItem.id),
        },
        delete:{
          ...state.create,
          ongoing:false,
          success: true,
        }
      };
    }
    case Client.TYPES.DELETE_CLIENT_FAIL: {
      console.log(Client.TYPES.DELETE_CLIENT_FAIL);
      console.log(action.payload);
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



