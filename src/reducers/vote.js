'use strict';

import { VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILTURE, DISMISS_ERROR } from '../const';

const initialState = {
  isRequesting: false,
  isSuccess: false,
  error: {
    isError: false,
    status: '',
    statusText: ''
  }
};

export default function (state = initialState, action){

  switch(action.type){
    case VOTE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        error: {
          isError: false
        }
        
      });

    case VOTE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        error: {
          isError: false
        }
      });

    case VOTE_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        error: {
          isError: true,
          status: `${action.payload.status}`,
          statusText: `${action.payload.statusText}`
        }
      });

      case DISMISS_ERROR:
        return Object.assign({}, state, {
            error: {
                isError: false,
                status: '',
                statusText: ''
            }
        });

      default:
        return state;
  }
}
