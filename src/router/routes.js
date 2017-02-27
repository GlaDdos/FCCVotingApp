import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Header from '../components/HeaderPage/HeaderLogged';
import Poll from '../components/Poll/Poll';
import Layout from '../components/Layout';

export default (
  <Route path="/" component={Layout} >
    <IndexRoute component={App} />
    <Route path="poll/:id" component={Poll} />
  </Route>

);
