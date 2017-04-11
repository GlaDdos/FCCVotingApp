'use strict';

import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILTURE, LOGOUT_USER } from '../const';

const initialState = {
  token: null,
  firstName: null,
  lastName: null,
  email: null,
  isAuthenticated: false,
  isAuthenticating: false,
  errorMessage: null
};

export default function (state = initialState, action){

  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true,
        errorMessage: null
      });

    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        firstName: action.payload.user.firstName,
        lastName: action.payload.user.lastName,
        email: action.payload.user.email,
        errorMessage: null
      });

    case LOGIN_USER_FAILTURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isAuthenticating: false,
        token: null,
        firstName: null,
        lastName: null,
        email: null,
        errorMessage: `Authentication Error: ${action.payload.statusText}`
      });

    case LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        firstName: null,
        lastName: null,
        email: null,
        errorMessage: null
      });

    default:
      return state;
  }
}
