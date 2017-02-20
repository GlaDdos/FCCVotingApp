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

//action polls public
export function pollsDataRequest(){
  return {
    type: actionTypes.POLLS_DATA_REQUEST
  };
}

export function pollsDataSuccess(data){
  return {
    type: actionTypes.POLLS_DATA_SUCCESS,
    payload: {
      data:data
    }
  };
}

export function pollsDataFailture(error){
  return {
    type: actionTypes.POLLS_DATA_FAILTURE,
    payload: {
      stats: error.response.status,
      statusText: error.response.statusText
    }
  };
}

//actions user data
export function userPollsDataRequest(){
  return {
    type: actionTypes.USER_POLLS_DATA_REQUEST
  };
}

export function userPollsDataSuccess(data){
  return {
    type: actionTypes.USER_POLLS_DATA_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function userPollsDataFailture(error){
  return {
    type: actionTypes.USER_POLLS_DATA_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

//user owned polls update
export function userPollUpdateRequest(){
  return {
    type: actionTypes.USER_POLL_UPDATE_REQUEST
  };
}

export function userPollUpdateSuccess(data){
  return {
    type: actionTypes.USER_POLL_UPDATE_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function userPollUpdateFailture(error){
  return {
    type: actionTypes.USER_POLL_UPDATE_FAILTURE,
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
