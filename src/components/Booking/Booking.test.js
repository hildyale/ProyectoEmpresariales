import React from 'react';
import ReactDOM from 'react-dom';
import Booking from './';

describe('Booking test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <Booking/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

});