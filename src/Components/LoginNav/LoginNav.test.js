import React from 'react';
import ReactDOM from 'react-dom';
import LoginNav from './';

describe('LoginNav test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <LoginNav/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

});