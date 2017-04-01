import React, { Component } from 'react';
import Header from './Header/Header';
import Home from './Home/Home';


class Layout extends Component {
  render (){
    return (
      <div>
        <Header />
        <div className="container">
          <Home />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
