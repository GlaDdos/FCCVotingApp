'use strict';
import fetch from 'isomorphic-fetch';
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
      statusText: error.message
    }
  };
}

export function loginUserSuccess(payload){
  return {
    type: LOGIN_USER_SUCCESS,
    payload: payload
  };
}

export function logoutUser(){
  return {
    type: LOGOUT_USER
  };
}

export function loginUser(user){

  return function (dispatch){

    dispatch(loginUserRequest());

    return fetch('http://localhost:3000/auth/login', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then( response => {
      console.log(response)
      if(!response.ok)
        throw Error(response.statusText)
    })
    .then( response => response.json())
    .then( json => dispatch(loginUserSuccess(json)))
    .catch( error => dispatch(loginUserFailture(error)))

  }
}

export function registerUser(user) {
  return function(dispatch) {
    dispatch(loginUserRequest());

    return fetch('http://localhost:3000/auth/register', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'POST',
      body: JSON.stringify(user)
    })
    .then( response => {
      if(!response.ok){
         return response.json().then(json => { throw Error(json.error) })
      }
    })
    .then( response => response.json())
    .then( json => dispatch(loginUserSuccess(json)))
    .catch(error => {console.dir(error); dispatch(loginUserFailture(error))})
  }
}