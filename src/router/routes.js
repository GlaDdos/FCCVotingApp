import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Header from '../components/Header';
import Layout from '../components/Layout';

export default (
  <Route path="/" component={Layout} >
    <IndexRoute component={App} />
    <Route path="app" component={App} />
    <Route path="head" component={Header} />
  </Route>

);
