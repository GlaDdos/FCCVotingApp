import React, { Component } from 'react';
import {Link} from 'react-router';

export default class Home extends Component {
  render(){
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
              <Link to="poll"><button type="button" className="btn btn-primary">View Polls</button></Link>
              <Link to="login"><button type="button" className="btn btn-primary">Log In</button></Link>
              <Link to="signin"><button type="button" className="btn btn-primary">Sign In</button></Link>
            </div>
          </div>
      </div>
    )
  }
}
