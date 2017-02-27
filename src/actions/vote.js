'use strict';

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
