import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './components/App';
import Root from './router/Router';


const render = (Component) => {
  ReactDOM.render(
      <Component />,
    document.getElementById('app')
  );
};

render(Root);

if(module.hot){
  console.log('module hot');
  module.hot.accept('./router/Router', () => {
    const Root = require('./router/Router').default;
    render(Root)
  });
}
