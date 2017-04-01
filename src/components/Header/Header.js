import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">FCCVoting</a>
          </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Sign Up</a></li>
              <li><a href="#">Log In</a></li>
            </ul>
          </div>
      </nav>
    );
  }
}
