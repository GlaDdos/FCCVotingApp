'use strict';

import fetch from 'isomorphic-fetch';
import {
  POLL_DATA_REQUEST,
  POLL_DATA_SUCCESS,
  POLLS_DATA_FAILTURE,
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_FAILTURE
} from '../const';

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
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function pollDataRequest(){
  return {
    type: POLL_DATA_REQUEST
  };
}

export function pollDataSuccess(poll){
  return {
    type: POLL_DATA_SUCCESS,
    payload: poll
  };
}

export function pollDataFailture(error){
  return {
    type: POLLS_DATA_FAILTURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function vote(pollId, optionId){
  return function (dispatch){
    console.log('helou');
    dispatch(voteRequest());
    console.log('/api/polls/' + pollId +'/' + optionId);
      return fetch('http://localhost:3000/api/poll/' + pollId +'/' + optionId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: {'ok': 'true'}
      })
      .then(response => response.json())
      .then(json => dispatch(voteSuccess(json)));
  };
}


export function getPollData(id){
  return function (dispatch){
    dispatch(pollDataRequest());
      return fetch('/api/polls/' + id, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(json => dispatch(pollDataSuccess(json)))
  };
}