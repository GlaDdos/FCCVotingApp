import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render(){
    return (
      <div className="container">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <Link to={'/'}><span className="navbar-brand">Voter</span></Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">New poll</a></li>
            <li><a href="#">Profile</a></li>
            <li><button type="button" className="btn btn-primary navbar-btn">Logout</button></li>
          </ul>

        </nav>
      </div>
    );
  }
}

export default Header;
