'use strict';

import actionTypes from '../const/index';


//action login
export function loginUserRequest(){
  return {
    type: actionTypes.LOGIN_USER_REQUEST
  };
}

export function loginUserFailture(error){
  return {
    type: actionTypes.LOGIN_USER_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function loginUserSuccess(token){
  return {
    type: actionTypes.LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  };
}

export function logoutUser(){
  return {
    type: actionTypes.LOGOUT_USER
  };
}

//action pools public
export function poolsDataRequest(){
  return {
    type: actionTypes.POOLS_DATA_REQUEST
  };
}

export function poolsDataSuccess(data){
  return {
    type: actionTypes.POOLS_DATA_SUCCESS,
    payload: {
      data:data
    }
  };
}

export function poolsDataFailture(error){
  return {
    type: actionTypes.POOLS_DATA_FAILTURE,
    payload: {
      stats: error.response.status,
      statusText: error.response.statusText
    }
  };
}

//actions user data
export function userPoolsDataRequest(){
  return {
    type: actionTypes.USER_POOLS_DATA_REQUEST
  };
}

export function userPoolsDataSuccess(data){
  return {
    type: actionTypes.USER_POOLS_DATA_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function userPoolsDataFailture(error){
  return {
    type: actionTypes.USER_POOLS_DATA_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

//user owned pools update
export function userPoolUpdateRequest(){
  return {
    type: actionTypes.USER_POOL_UPDATE_REQUEST
  };
}

export function userPoolUpdateSuccess(data){
  return {
    type: actionTypes.USER_POOL_UPDATE_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function userPoolUpdateFailture(error){
  return {
    type: actionTypes.USER_POOL_UPDATE_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

//voitin actions
export function voteRequest(){
  return {
    type: actionTypes.VOTE_REQUEST
  };
}

export function voteSuccess(data){
  return {
    type: actionTypes.VOTE_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function voteFailture(error){
  return {
    type: actionTypes.VOTE_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}
