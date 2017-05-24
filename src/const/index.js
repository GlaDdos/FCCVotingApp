'use strict';

module.exports = {
  //login actions (unprotected)
  LOGIN_USER_REQUEST:   'LOGIN_USER_REQUEST',
  LOGIN_USER_FAILTURE:  'LOGIN_USER_FAILTURE',
  LOGIN_USER_SUCCESS:   'LOGIN_USER_SUCCESS',

  //user logout (protected - option only visible for authenticated users)
  LOGOUT_USER:          'LOGOUT_USER',

  //register actions (unproteceted)
  REGISTER_REQUEST:  'REGISTER_REQUEST',
  REGISTER_SUCCESS:   'REGISTER_SUCCESS',
  REGISTER_FAILTURE: 'REGISTER_FAILTURE',

  //public pools getter (unprotected)
  POLLS_DATA_REQUEST:   'POLLS_DATA_REQUEST',
  POLLS_DATA_SUCCESS:   'POLLS_DATA_SUCCESS',
  POLLS_DATA_FAILTURE:  'POLLS_DATA_FAILTURE',

  //authenticated user owned pools (protected)
  USER_POLLS_DATA_REQUEST:  'USER_POLLS_DATA_REQUEST',
  USER_POLLS_DATA_SUCCESS:  'USER_POLLS_DATA_SUCCESS',
  USER_POLLS_DATA_FAILTURE: 'USER_POLLS_DATA_FAILTURE',

  //update user owned pools i.e. adding options removing etc. (protected)
  USER_POLL_UPDATE_REQUEST:   'USER_POLL_UPDATE_REQUEST',
  USER_POLL_UPDATE_SUCCESS:   'USER_POLL_UPDATE_SUCCESS',
  USER_POLL_UPDATE_FAILTURE:  'USER_POLL_UPDATE_FAILTURE',

  USER_POLL_CREATE_REQUEST:   'USER_POLL_CREATE_REQUEST',
  USER_POLL_CREATE_SUCCESS:   'USER_POLL_CREATE_SUCCESS',
  USER_POLL_CREATE_FAILTURE:  'USER_POLL_CREATE_FAILTURE',

  USER_POLL_DELETE_REQUEST:   'USER_POLL_DELETE_REQUEST',
  USER_POLL_DELETE_SUCCESS:   'USER_POLL_DELETE_SUCCESS',
  USER_POLL_DELETE_FAILTURE:  'USER_POLL_DELETE_FAILTURE',

  //voting (unprotected)
  VOTE_REQUEST:   'VOTE_REQUEST',
  VOTE_SUCCESS:   'VOTE_SUCCESS',
  VOTE_FAILTURE:  'VOTE_FAILTURE',

  //single poll
  POLL_DATA_REQUEST: 'POLL_DATA_REQUEST',
  POLL_DATA_SUCCESS: 'POLL_DATA_SUCCESS',
  POLL_DATA_FAILTURE: 'POLL_DATA_FAILTURE'
};

//export default actionTypes;
