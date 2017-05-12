'use strict';

import fetch from 'isomorphic-fetch';
import {
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

export function vote(id, voteId){
  return function (dispatch){
    console.log('helou');
    dispatch(voteRequest());
    console.log('/api/polls/' + id +'/' + voteId);
      return fetch('http://localhost:3000/api/polls/' + id +'/' + voteId, {
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
