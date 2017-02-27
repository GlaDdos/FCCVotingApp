'use strict';

import { VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILTURE } from '../const';

const initialState = {
  isRequesting: false,
  isSuccess: false,
  statusText: null
};

export default function (state = initialState, action){

  switch(action.type){
    case VOTE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        statusText: 'Voting...'
      });

    case VOTE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        statusText: 'Your vote was saved.'
      });

    case VOTE_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        statusText: `Voting Error: ${action.payload.status} ${action.payload.statusText}`
      });

      default:
      return state;
  }
}
