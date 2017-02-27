import React from 'react';
import { Link } from 'react-router';
import NewPoll from './NewPoll/NewPool';
import ListPolls from './ListPolls/ListPolls';

class App extends React.Component {
  render(){
    return (
      <div> Hello from React App asd component with Redux
        <Link to={'/head'}>Header</Link>

        <div className="container">
          <NewPoll />
          <ListPolls />
        </div>
      </div>

    );
  }
}

export default App;
