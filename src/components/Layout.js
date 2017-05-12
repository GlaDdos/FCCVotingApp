import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

import Header from './Header/Header';
import Home from './Home/Home';

import { loginUserSuccess } from './../actions/auth';

class Layout extends Component {
  
  componentWillMount(){
    if(!this.props.isAuthenticated){
      const payload = {};

      payload.token = cookie.load('token');
      payload.user = cookie.load('user');

      if( payload.token && payload.user){
        this.props.loginUserSuccess(payload);
      }
      //TODO: verification if cookie, esp. token is correct 
    }
  }

  render (){
    return (
      <div>
        <Header />
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserSuccess: (payload) => {dispatch(loginUserSuccess(payload))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
