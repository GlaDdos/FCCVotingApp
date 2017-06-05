'use strict';

import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import {
  VOTE_REQUEST,
  VOTE_SUCCESS,
  VOTE_FAILTURE
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
      .then(json => {
        dispatch(voteSuccess(json));
        return json;
      })
      .then( 
        json => {
          dispatch(pollDataSuccess(json))});
  };
}
