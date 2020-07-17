import {IUser} from '../../models/admin.models'
import * as fromAuth from '../actions/auth.actions'

export interface State {
  entity: {
    item: IUser;
    logged: boolean;
  };
  signIn: {
    ongoing: boolean,
    success: boolean,
    error: string
  };
  singOut: {
    ongoing: boolean,
    success: boolean,
    error: string
  };
};

export const initialState: State = {
  entity:{
    item: null,
    logged: false
  },
  signIn:{
    ongoing: false,
    success: false,
    error: ''
  },
  singOut:{
    ongoing: false,
    success: false,
    error: ''
  }
};

export function reducer(
  state = initialState,
  action: fromAuth.AuthActions
): State {
  switch (action.type) {
    case fromAuth.AUTH_ACTION_TYPES.SIGN_IN: {
      console.log(fromAuth.AUTH_ACTION_TYPES.SIGN_IN);
      return {
        ...state,
        signIn:{
          ongoing: true,
          success: false,
          error: '',
        }
      };
    }
    case fromAuth.AUTH_ACTION_TYPES.SIGN_IN_SUCCESS: {
      console.log(fromAuth.AUTH_ACTION_TYPES.SIGN_IN_SUCCESS);
      return {
        ...state,
        entity:{
          item: action.payload,
          logged: true
        },
        signIn:{
          ...state.signIn,
          ongoing: false,
          success: true
        }
      };
    }
    case fromAuth.AUTH_ACTION_TYPES.SIGN_IN_FAIL: {
      console.log(fromAuth.AUTH_ACTION_TYPES.SIGN_IN_FAIL);
      return {
        ...state,
        signIn:{
          ongoing: false,
          success: false,
          error: action.payload
        }
      };
    }
    case fromAuth.AUTH_ACTION_TYPES.SIGN_OUT: {
      console.log(fromAuth.AUTH_ACTION_TYPES.SIGN_OUT);
      return {
        ...state,
        singOut: {
          ongoing: true,
          success: false,
          error:''
        }
      };
    }
    case fromAuth.AUTH_ACTION_TYPES.SIGN_OUT_SUCCESS: {
      console.log(fromAuth.AUTH_ACTION_TYPES.SIGN_OUT_SUCCESS);
      return {
        ...state,
        entity:{
          item: null,
          logged: false
        },
        singOut:{
          ...state.singOut,
          ongoing: false,
          success: true,
        }
      };
    }
    case fromAuth.AUTH_ACTION_TYPES.SIGN_OUT_FAIL: {
      console.log(fromAuth.AUTH_ACTION_TYPES.SIGN_OUT_FAIL);
      return {
        ...state,
        singOut:{
          ...state.singOut,
          ongoing: false,
          success: false,
          error: action.payload
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const getAuthUser = (state: State) => state.entity.item;
export const getAuthLogged = (state: State) => state.entity.logged;

export const getSignInOngoing = (state: State) => state.signIn.ongoing;
export const getSignInSuccess = (state: State) => state.signIn.success;
export const getSignInError = (state: State) => state.signIn.error;

export const getSignOutOngoing = (state: State) => state.singOut.ongoing;
export const getSignOutSuccess = (state: State) => state.singOut.success;
export const getSignOutError = (state: State) => state.singOut.error;
