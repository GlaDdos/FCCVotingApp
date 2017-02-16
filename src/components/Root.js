import React from 'react';
import { Provider } from 'react-redux';
import routes from '../router/routes';
import {Router, browserHistory } from 'react-router';

export default class Root extends React.Component {
  render(){
    return(
      <div>
        <Provider store={this.props.store}>
          <div>
            <Router history={browserHistory} routes={routes} />
          </div>
        </Provider>
      </div>
    );
  }
}

Root.propTypes = {
  store: React.PropTypes.object.isRequired
};
