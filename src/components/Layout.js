import React, { Component } from 'react';
import Header from './Header/Header';
import Home from './Home/Home';
import SignIn from './SignIn/SignIn'


class Layout extends Component {
  render (){
    return (
      <div>
        <Header />
        <div className="container">
          <Home />
          {this.props.children}
          <SignIn />
        </div>
      </div>
    );
  }
}

export default Layout;
