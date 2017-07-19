'use strict';

import fetch from 'isomorphic-fetch';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import {  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILTURE, LOGOUT_USER, API_URL } from '../const';

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
  return function(dispatch) {
      dispatch(loginUserRequest());

      return fetch( API_URL + '/auth/login', {
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        method: 'POST',
        body: JSON.stringify(user)
      })
      .then( response => {

        if(response.status == '401'){
           throw Error('Login failed. Wrong email or password.');
        }
        
        return response.json();
      })
      .then( json => {
        cookie.save('token', json.token, { path: '/' });
        cookie.save('user', json.user, { path: '/' });
        dispatch(loginUserSuccess(json));
        browserHistory.push('/');
      })
      .catch(error => {dispatch(loginUserFailture(error))})
    }
} 

export function getToken(){
  return function(dispatch) {
    dispatch(loginUserRequest());

    return fetch(API_URL + '/auth/social/login', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'GET',
      credentials:'include'
    })
    .then( response => {
      if(!response.ok){
        return response.json().then(json => { throw Error("Login failed. Email already in use.") })
      }
      
      return response.json();
    })
    .then( json => {
      cookie.save('token', json.token, { path: '/' });
      cookie.save('user', json.user, { path: '/' });
      dispatch(loginUserSuccess(json));
      browserHistory.push('/');
    })
    .catch(error => {
      dispatch(loginUserFailture(error));
      browserHistory.push('/login');
    })
  }
}

export function logout() {
  return function(dispatch){
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/'});

    return fetch(API_URL + '/auth/logout', {
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      method: 'GET'
    })
    .then( response => response.json())
    .then(json => {
      dispatch(logoutUser());
      browserHistory.push('/');
    })
    .catch(err => {return false;} )
  };
}