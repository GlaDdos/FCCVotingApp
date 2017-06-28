import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

class Home extends Component {
  render(){
    const { isAuthenticated } = this.props;
    return(
      <div className="jumbotron jumbotron-fluid">
        <h1 className="display-3 text-center">Free Code Camp Voting App </h1>
        <br />
        <p className="lead">
          Welcome to Voting App, project created for Free Code Camps Back End Development Certificate. You can view and vote on existing polls.
          Log in to create new polls, add options to existing ones and check up on those created by you. If you want to create an account - click Sign In.
          Happy voting!
        </p>
        <br />
          <div className="text-center">
            <div className="btn-group btn-group-lg">
              <Link to="poll"><div className="btn btn-link-2">View Polls</div></Link>
              { !isAuthenticated && <Link to="login"><div className="btn btn-link-2">Log In</div></Link>}
              { !isAuthenticated && <Link to="signin"><div className="btn btn-link-2">Sign In</div></Link>}
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(Home);