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
  USER_POLL_DELETE_FAILTURE

} from '../const';

const initialState = {
  isRequesting: false,
  isSuccess: false,
  statusText: null,
  pools: [{
    owner: "",
    title: "",
    options: [{
      name: "",
      votes: 0
    }],
    date: null
  }]
};

export default function (state = initialState, action){
  switch(action.type){
    case USER_POLLS_DATA_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess:false,
        statusText: 'Getting polls...'
      });

    case USER_POLLS_DATA_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        polls: action.payload.polls,
        statusText: 'Request successfull'
      });

    case USER_POLLS_DATA_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        statusText: `Error while requesting data: ${action.payload.status} ${action.payload.statusText}`
      });

    case USER_POLL_CREATE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        statusText: 'Creating poll...'
      });

    case USER_POLL_CREATE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        statusText: 'New poll created.'
      });

    case USER_POLL_CREATE_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        statusText: `Error while creating poll: ${action.payload.status} ${action.payload.statusText}`
      });

    case USER_POLL_UPDATE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        statusText: 'Updating poll...'
      });

    case USER_POLL_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        statusText: 'Poll updated.'
      });

    case USER_POLL_UPDATE_FAILTURE:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: false,
        statusText: `Error while updating poll: ${action.payload.status} ${action.payload.statusText}`
      });

    case USER_POLL_DELETE_REQUEST:
      return Object.assign({}, state, {
        isRequesting: true,
        isSuccess: false,
        statusText: 'Deleting poll...'
      });

    case USER_POLL_DELETE_SUCCESS:
      return Object.assign({}, state, {
        isRequesting: false,
        isSuccess: true,
        statusText: 'Poll deleted.'
      });

    case USER_POLL_DELETE_FAILTURE:
    return Object.assign({}, state, {
      isRequesting: false,
      isSuccess: true,
      statusText: `Error while deleting poll: ${action.payload.status} ${action.payload.statusText}`
    });

    default:
      return state;
  }
}
