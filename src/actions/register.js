'use strict';

import fetch from 'isomorphic-fetch';
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILTURE } from '../const';

export function registerRequest(){
  return {
    type: REGISTER_REQUEST
  };
}

export function registerSuccess(payload){
  return {
    type: REGISTER_SUCCESS,
    payload: payload
  };
}

export function registerFailture(error){
  return {
    type: REGISTER_FAILTURE,
    payload: {
        status: error.status,
        statusText: error.message
    }
  };
}

export function registerUser(user) {
  return function(dispatch) {
    dispatch(registerRequest());

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

      return response.json()
    })
    .then( json => dispatch(registerSuccess(json)))
    .catch(error => {console.dir(error); dispatch(registerFailture(error))})
  }
}