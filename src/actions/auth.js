'use strict';

import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILTURE,
  LOGOUT_USER
} from '../const';

export function loginUserRequest(){
  return {
    type: LOGIN_USER_REQUEST
  };
}

export function loginUserFailture(error){
  return {
    type: LOGIN_USER_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function loginUserSuccess(token){
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  };
}

export function logoutUser(){
  return {
    type: LOGOUT_USER
  };
}
