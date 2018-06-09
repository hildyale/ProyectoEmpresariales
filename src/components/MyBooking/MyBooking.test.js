import React from 'react';
import ReactDOM from 'react-dom';
import MyBooking from 'components/MyBooking';

describe('myBooking test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <MyBooking/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

});