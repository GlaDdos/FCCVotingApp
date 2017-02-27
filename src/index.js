import 'babel-polyfill';

import React from 'react';
import ReactDOM  from 'react-dom';
import Root from './components/Root';
import './styles/styles.css';

import configureStore from './store/configureStore';

const target = document.getElementById('app');
const store = configureStore(window.__INITIAL_STATE__);

const node = (
  <Root store={store} />
);

ReactDOM.render(node, target);
