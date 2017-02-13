import React from 'react';
import Header from './Header';
import { Link } from 'react-router';

class App extends React.Component {
  render(){
    return (
      <div> Hello from React App component
        <Link to={'/head'}>Header</Link>
      </div>
    );
  }
}

export default App;
