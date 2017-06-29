'use strict';

import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import {
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_FAILTURE,

  DISMISS_ERROR
} from '../const';

import { pollDataSuccess } from './poll';

export function voteRequest(){
  return {
    type: VOTE_REQUEST
  };
}

export function voteSuccess(data){
  return {
    type: VOTE_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function voteFailture(error){
  return {
    type: VOTE_FAILTURE,
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

export function vote(pollId, optionId){
  return function (dispatch){
    dispatch(voteRequest());
      return fetch('http://voting.gladdos.usermd.net/api/poll/' + pollId +'/' + optionId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }})
      .then(response => response.json())
      .then(json => {
        dispatch(voteSuccess(json));
        return json;
      })
      .then( json => dispatch(pollDataSuccess(json)))
      .catch( err => {
        const payload = {
          status: "Connection error",
          statusText: "Server is not responding. Please try again later."
        }
        dispatch(voteFailture(payload));
      });
  };
}
