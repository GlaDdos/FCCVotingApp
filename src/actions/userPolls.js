'use strict';

import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
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
  USER_POLL_DELETE_FAILTURE,

  DISMISS_ERROR
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
      status: error.status,
      statusText: error.statusText
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
      status: error.status,
      statusText: error.statusText
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
      status: error.status,
      statusText: error.statusText
    }
  };
}


export function createPoll(token, data){
  return function (dispatch) {
    dispatch(userPollCreateRequest());
      return fetch('http://voting.gladdos.usermd.net/api/poll', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(data)
      })
      .then( response => response.json())
      .then( json => {
        dispatch(userPollCreateSuccess(json));
        browserHistory.push(`/poll/${json._id}`);
      })
      .catch(err => {
        const payload = {
          status: "Connection error",
          statusText: "Server is not reasponding. Please try again later"
        };

        dispatch(userPollCreateFailture(payload));
      });
  };
}

export function userPollsRequest(userId){
  return function(dispatch){
    dispatch(userPollsDataRequest());
      return fetch(`http://voting.gladdos.usermd.net/api/polls/${userId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then( response => response.json())
      .then( json => dispatch(userPollsDataSuccess(json)))
      .catch( err => {
        console.log(err);
        const payload = {
          status: "Connection error.",
          statusText: "Server is not responding. Please try again later."
        }

        dispatch(userPollsDataFailture(payload));
      });
  }
}

export function deletePoll(token, pollId){
  return function(dispatch){
    dispatch(userPollDeleteRequest());
      return fetch(`http://voting.gladdos.usermd.net/api/poll/${pollId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }
      })
      .then( response => response.json())
      .then( json => dispatch(userPollDeleteSucces()))
      .catch( err => {
        const payload = {
          status: "Connection error.",
          statusText: "Server is not responding. Please try again later."
        }

        dispatch(userPollDeleteFailture(payload));
      });
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
      status: error.status,
      statusText: error.statusText
    }
  };
}

export function dismissError(){
    return {
        type: DISMISS_ERROR
    };
}