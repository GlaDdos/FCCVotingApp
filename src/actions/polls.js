'use strict';

import fetch from 'isomorphic-fetch';
import {
  POLLS_DATA_REQUEST,
  POLLS_DATA_SUCCESS,
  POLLS_DATA_FAILTURE
} from '../const';

export function pollsDataRequest(){
  return {
    type: POLLS_DATA_REQUEST
  };
}

export function pollsDataSuccess(data){
  return {
    type: POLLS_DATA_SUCCESS,
    payload: {
      data: data
    }
  };
}

export function pollsDataFailture(error){
  return {
    type: POLLS_DATA_FAILTURE,
    payload: {
      stats: error.response.status,
      statusText: error.response.statusText
    }
  };
}

export function getPolls(){
  return function (dispatch) {
    dispatch(pollsDataRequest());
      return fetch('http://localhost:3000/api/polls', {
        method: 'GET'
      })
      .then( response => response.json())
      .then( json => dispatch(pollsDataSuccess(json)));
  };
}