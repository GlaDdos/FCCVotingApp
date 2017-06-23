import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from '../components/App';
import Poll from '../components/Poll/Poll';
import Layout from '../components/Layout';

import SingnIn from '../components/SignIn/SignIn';
import Login from '../components/LogIn/Login';
import NewPoll from '../components/NewPoll/NewPool';
import ListPolls from '../components/ListPolls/ListPolls';
import UserPolls from '../components/UserPolls/UserPolls';
import UserPoll from '../components/UserPoll/UserPoll';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout} >
      <IndexRoute component={App} />
      <Route path="/newpoll" component={NewPoll} />
      <Route path="/poll" component={ListPolls} />
      <Route path="/user/polls" component={UserPolls} />
      <Route path="/user/poll/:id" component={UserPoll} />
      <Route path="/poll/:id" component={Poll} />
      <Route path="/signin" component={SingnIn} />
      <Route path="/login" component={Login} />
    </Route>
  </Router>

);
