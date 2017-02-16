'use strict';

import { combineReducers } from 'redux';

import auth from './auth';
import vote from './vote';

export default combineReducers({
  auth,
  vote
});
