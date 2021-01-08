import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (token: string | null, userId: string | null) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: token,
  userId,
});

export const authFail = (error: any) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime: number) => (dispatch: any) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const auth = (email: string, password: string, isSignup: boolean) => (dispatch: any) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQqMQSL8Hrlb_zmvTfnW2pIm3z3l79EM4';
  if (!isSignup) {
    url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQqMQSL8Hrlb_zmvTfnW2pIm3z3l79EM4';
  }
  if (email && password) {
    axios.post(url, authData)
      .then((response) => {
        const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expDate', String(expDate));
        localStorage.setItem('userId', response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  }
};

export const authChackState = () => (dispatch: any) => {
  const token = localStorage.getItem('token');
  const expTime = new Date(localStorage.getItem('expDate') || '');
  const userId = localStorage.getItem('userId');
  if (expTime <= new Date()) {
    dispatch(logout());
  } else {
    dispatch(authSuccess(token, userId));
    dispatch(checkAuthTimeout((expTime.getTime() - new Date().getTime()) / 1000));
  }
};
