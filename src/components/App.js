import React from 'react';
import { Link } from 'react-router';
import NewPoll from './NewPoll/NewPool';

class App extends React.Component {
  render(){
    return (
      <div> Hello from React App component with Redux
        <Link to={'/head'}>Header</Link>
        
        <div className="container">
          <NewPoll />
        </div>
      </div>

    );
  }
}

export default App;
