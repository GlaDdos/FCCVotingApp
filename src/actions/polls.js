'use strict';

import fetch from 'isomorphic-fetch';
import {
  POLLS_DATA_REQUEST,
  POLLS_DATA_SUCCESS,
  POLLS_DATA_FAILTURE,

  DISMISS_ERROR
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
      stats: error.status,
      statusText: error.statusText
    }
  };
}

export function dismissError(){
    return {
        type: DISMISS_ERROR
    };
}

export function getPolls(){
  return function (dispatch) {
    dispatch(pollsDataRequest());
      return fetch('http://localhost:3000/api/polls', {
        method: 'GET'
      })
      .then( response => response.json())
      .then( json => dispatch(pollsDataSuccess(json)))
      .catch( err => {
        const payload = {
          status: "Connection error",
          statusText: "Server is not responding. Please try again later"
        };

        dispatch(pollsDataFailture(payload));
      })
  };
}
