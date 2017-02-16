'use strict';

import { VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILTURE } from '../const/index';

const initialState = {
  isVoting: false,
  isVoted: false,
  statusText: null
};

export default function (state = initialState, action){

  switch(action.type){
    case VOTE_REQUEST:
      return Object.assign({}, state, {
        isVoting: true,
        isVoted: false,
        statusText: 'Voting...'
      });

    case VOTE_SUCCESS:
      return Object.assign({}, state, {
        isVoting: false,
        isVoted: true,
        statusText: 'Your vote was saved.'
      });

    case VOTE_FAILTURE:
      return Object.assign({}, state, {
        isVoting: false,
        isVoted: false,
        statusText: `Voting Error: ${action.payload.status} ${action.payload.statusText}`
      });

      default:
      return state;
  }
}
