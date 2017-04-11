'use strict';

import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import auth from './auth';
import register from './register';
import vote from './vote';
import userPolls from './userPolls';
import polls from './polls';

export default combineReducers({
  auth,
  vote,
  userPolls,
  polls,
  register,
  form
});
