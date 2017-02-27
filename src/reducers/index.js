'use strict';

import { combineReducers } from 'redux';

import auth from './auth';
import vote from './vote';
import userPolls from './userPolls';
import polls from './polls';

export default combineReducers({
  auth,
  vote,
  userPolls,
  polls
});
