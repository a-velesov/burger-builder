import * as actionTypes from '../actions/actionTypes';
import {AnyAction} from "redux";

export interface IAction<T> extends AnyAction {
  type: string;
  payload: T;
}

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
};

const authStart = (state: AuthState) => {
  return {
    ...state,
    error: null,
  };
}

const authSuccess = (state: AuthState, action: IAction<string>) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
  };
}

const authFail = (state: AuthState, action: IAction<any>) => {
  return {
    ...state,
    error: action.error,
  };
}

const authLogout = (state: AuthState) => {
  return {
    ...state,
    token: null,
    userId: null,
  };
}

const reducer = (state = initialState, action: IAction<any>) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state);
    default:
      return state;
  }
};

export default reducer;
