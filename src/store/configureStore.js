'use strict';

import rootReducer from '../reducers';
import routes from '../router/routes';

import 'babel-polyfill';
import thunk from 'redux-thunk';

import { applyMiddleware, compose, createStore } from 'redux';


export default function configureStore(initialState){
  const store = createStore(rootReducer, applyMiddleware(thunk));

  return store;

}
