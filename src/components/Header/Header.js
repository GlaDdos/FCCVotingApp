import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class Header extends React.Component {
  render(){
    const authenticated = this.props.isAuthenticated;
  
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container">
          <div className="navbar-header">
            <Link to="/"><a className="navbar-brand" href="/">FCCVoting</a></Link>
          </div>
              {
                authenticated ? (
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="/">{`Hello, ${this.props.firstName}!`}</a></li>
                    <li><Link to="newpoll">New Poll</Link></li>
                    <li><a href='#'>My polls</a></li>
                    <li><a href='#' onClick={this.props.logout}>Log out</a></li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav navbar-right">
                    <li><a href="#">Sign Up</a></li>
                    <li><a href="#">Log In</a></li>
                  </ul>
                )
              }
          </div>
      </nav>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    firstName: state.auth.firstName
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch(logout()) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);