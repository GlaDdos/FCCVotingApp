'use strict';

import fetch from 'isomorphic-fetch';
import {
  USER_POLLS_DATA_REQUEST,
  USER_POLLS_DATA_SUCCESS,
  USER_POLLS_DATA_FAILTURE,

  USER_POLL_CREATE_REQUEST,
  USER_POLL_CREATE_SUCCESS,
  USER_POLL_CREATE_FAILTURE,

  USER_POLL_UPDATE_REQUEST,
  USER_POLL_UPDATE_SUCCESS,
  USER_POLL_UPDATE_FAILTURE,

  USER_POLL_DELETE_REQUEST,
  USER_POLL_DELETE_SUCCESS,
  USER_POLL_DELETE_FAILTURE
} from '../const';


export function userPollsDataRequest(){
  return {
    type: USER_POLLS_DATA_REQUEST
  };
}

export function userPollsDataSuccess(data){
  return {
    type: USER_POLLS_DATA_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function userPollsDataFailture(error){
  return {
    type: USER_POLLS_DATA_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

//user owned polls update
export function userPollUpdateRequest(){
  return {
    type: USER_POLL_UPDATE_REQUEST
  };
}

export function userPollUpdateSuccess(data){
  return {
    type: USER_POLL_UPDATE_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function userPollUpdateFailture(error){
  return {
    type: USER_POLL_UPDATE_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function userPollCreateRequest(){
  return {
    type: USER_POLL_CREATE_REQUEST
  };
}

export function userPollCreateSuccess(data){
  return {
    type: USER_POLL_CREATE_SUCCESS,
    payload: data
  };
}

export function userPollCreateFailture(error){
  return {
    type: USER_POLL_CREATE_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}


export function createPoll(token, data){
  return function (dispatch) {
    dispatch(userPollCreateRequest());
      return fetch('http://localhost:3000/api/poll', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(data)
      })
      .then( response => response.json())
      .then( json => dispatch(userPollCreateSuccess(json)));
  };
}

export function userPollsRequest(userId){
  return function(dispatch){
    dispatch(userPollsDataRequest());
      return fetch(`http://localhost:3000/api/polls/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then( response => response.json())
      .then( json =>{
         dispatch(userPollsDataSuccess(json))});
  }
}

export function deletePoll(token, id){
  return function(dispatch){
    dispatch(userPollDeleteRequest());
      return fetch(`http://localhost:3000/api/polls${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: {
          
        }
      })
      .then( response => response.json())
      .then( json => dipatch(userPollDeleteSucces()));
  }
}

export function userPollDeleteRequest(){
  return {
    type: USER_POLL_DELETE_REQUEST
  };
}

export function userPollDeleteSucces(){
  return {
    type: USER_POLL_DELETE_SUCCESS
  };
}

export function userPollDeleteFailture(error){
  return {
    type: USER_POLL_UPDATE_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}
