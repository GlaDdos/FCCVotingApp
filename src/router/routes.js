import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Poll from '../components/Poll/Poll';
import Layout from '../components/Layout';

import SingnIn from '../components/SignIn/SignIn';
import Login from '../components/LogIn/Login';
import NewPoll from '../components/NewPoll/NewPool';
import ListPolls from '../components/ListPolls/ListPolls';
import UserPolls from '../components/UserPolls/UserPolls';

export default (
  <Route path="/" component={Layout} >
    <IndexRoute component={App} />
    <Route path="newpoll" component={NewPoll} />
    <Route path="/poll" component={ListPolls} />
    <Route path="user/poll" component={UserPolls} />
    <Route path="poll/:id" component={Poll} />
    <Route path="signin" component={SingnIn} />
    <Route path="login" component={Login} />
  </Route>

);
