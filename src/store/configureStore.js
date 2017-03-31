'use strict';

import rootReducer from '../reducers';
import routes from '../router/routes';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import { applyMiddleware, compose, createStore } from 'redux';


export default function configureStore(initialState){
  let createStoreWithMiddleware;
  const logger = createLogger();

  const middleware = applyMiddleware(thunk, logger);

  createStoreWithMiddleware = composeWithDevTools(
    middleware
  );

  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

  return store;

}
