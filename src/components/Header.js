import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render(){
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Header</a>
          </div>
          <button type="button" className="btn btn-primary navbar-btn navbar-right">Sign in or not</button>
          <Link to={'/'}>App</Link>
        </div>
      </nav>
    );
  }
}

export default Header;
