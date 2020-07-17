import {IUser} from '../../models/admin.models'
import * as fromUser from '../actions/user.actions'

export interface State {
  entities: {
    items: Array<IUser>;
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
  action: fromUser.UserActions
): State {
  switch (action.type) {
    case fromUser.USER_ACTION_TYPES.LOAD_USERS: {
      console.log(fromUser.USER_ACTION_TYPES.LOAD_USERS);
      return {
        ...state,
        entities:{
          ...state.entities,
          loading: true,
        }
      };
    }
    case fromUser.USER_ACTION_TYPES.LOAD_USERS_SUCCESS: {
      console.log(fromUser.USER_ACTION_TYPES.LOAD_USERS_SUCCESS);
      return {
        ...state,
        entities:{
          items: action.payload,
          loaded: true,
          loading: false
        }
      };
    }
    case fromUser.USER_ACTION_TYPES.LOAD_USERS_FAIL: {
      console.log(fromUser.USER_ACTION_TYPES.LOAD_USERS_FAIL);
      return {
        ...state,
        entities:{
          ...state.entities,
          loaded: false,
          loading: false,
        }
      };
    }
    case fromUser.USER_ACTION_TYPES.REGISTER_USER: {
      console.log(fromUser.USER_ACTION_TYPES.REGISTER_USER);
      return {
        ...state,
        create: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromUser.USER_ACTION_TYPES.REGISTER_USER_SUCCESS: {
      console.log(fromUser.USER_ACTION_TYPES.REGISTER_USER_SUCCESS);
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
    case fromUser.USER_ACTION_TYPES.REGISTER_USER_FAIL: {
      console.log(fromUser.USER_ACTION_TYPES.REGISTER_USER_FAIL);
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
    case fromUser.USER_ACTION_TYPES.UPDATE_USER: {
      console.log(fromUser.USER_ACTION_TYPES.UPDATE_USER);
      return {
        ...state,
        update: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromUser.USER_ACTION_TYPES.UPDATE_USER_SUCCESS: {
      console.log(fromUser.USER_ACTION_TYPES.UPDATE_USER_SUCCESS);
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
    case fromUser.USER_ACTION_TYPES.UPDATE_USER_FAIL: {
      console.log(fromUser.USER_ACTION_TYPES.UPDATE_USER_FAIL);
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
    case fromUser.USER_ACTION_TYPES.DELETE_USER: {
      console.log(fromUser.USER_ACTION_TYPES.DELETE_USER);
      return {
        ...state,
        delete: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromUser.USER_ACTION_TYPES.DELETE_USER_SUCCESS: {
      console.log(fromUser.USER_ACTION_TYPES.DELETE_USER_SUCCESS);
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
    case fromUser.USER_ACTION_TYPES.DELETE_USER_FAIL: {
      console.log(fromUser.USER_ACTION_TYPES.DELETE_USER_FAIL);
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

export const getUserItems = (state: State) => state.entities.items;
export const getUsersLoaded = (state: State) => state.entities.loaded;
export const getUsersLoading = (state: State) => state.entities.loading;

export const getRegisterUserOngoing = (state: State) => state.create.ongoing;
export const getRegisterUserSuccess = (state: State) => state.create.success;
export const getRegisterUserError = (state: State) => state.create.error;

export const getUpdateUserOngoing = (state: State) => state.update.ongoing;
export const getUpdateUserSuccess = (state: State) => state.update.success;
export const getUpdateUserError = (state: State) => state.update.error;

export const getDeleteUserOngoing = (state: State) => state.delete.ongoing;
export const getDeleteUserSuccess = (state: State) => state.delete.success;
export const getDeleteUserError = (state: State) => state.delete.error;



