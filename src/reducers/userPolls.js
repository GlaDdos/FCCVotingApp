'use strict';

import {
  USER_POLLS_DATA_REQUEST,
  USER_POLLS_DATA_SUCCESS,
  USER_POLLS_DATA_FAILTURE,

  USER_POLL_CREATE_REQUEST,
  USER_POLL_CREATE_SUCCESS,
  USER_POLL_CREATE_FAILTURE,

  USER_POLL_UPDATE_REQUEST,
  USER_POLL_UPDATE_SUCCESS,
  USER_POLL_UPDATE_FAILTURE,


  USER_POLL_DELETE_REQUEST,
  USER_POLL_DELETE_SUCCESS,
  USER_POLL_DELETE_FAILTURE,

  DISMISS_ERROR

} from '../const';

const initialState = {
  isRequesting: false,
  isSuccess: false,
  polls: [{
    owner: "",
    title: "",
    options: [{
      name: "",
      votes: 0
    }],
    date: null
  }],
  error: {
    isError: false,
    status: '',
    statusText: ''
  }
};

export default function (state = initialState, action){
  switch(action.type){
    case USER_POLLS_DATA_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess:false,
        error: {
          isError: false
        }
      });

    case USER_POLLS_DATA_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        polls: action.payload.data,
        error: {
          isError: false
        }
      });

    case USER_POLLS_DATA_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        error: {
          isError: true,
          state: `${action.payload.status}`,
          statusText: `${action.payload.statusText}`
        }
      });

    case USER_POLL_CREATE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        error: {
          isError: false
        }
      });

    case USER_POLL_CREATE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        error: {
          isError: false
        }
      });

    case USER_POLL_CREATE_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        error: {
          isError: true,
          status: `${action.payload.status}`,
          statusText: `${action.payload.statusText}`
        }
      });

    case USER_POLL_UPDATE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        error: {
          isError: false
        }
      });

    case USER_POLL_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        error: {
          isError: false
        }
      });

    case USER_POLL_UPDATE_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        error: {
          isError: true,
          status: `${action.payload.status}`,
          statusText: `${action.payload.statusText}`
        }
      });

    case USER_POLL_DELETE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        error: {
          isError: false
        }
      });

    case USER_POLL_DELETE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        error: {
          isError: false
        }
      });

    case USER_POLL_DELETE_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
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
