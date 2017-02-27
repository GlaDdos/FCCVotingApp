import React from 'react';

class Layout extends React.Component {
  render (){
    return (
      <div>Layout 
        {this.props.children}
      </div>
    );
  }
}

export default Layout;
