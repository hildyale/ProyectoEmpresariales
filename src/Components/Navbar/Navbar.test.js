import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './';
import { BrowserRouter } from 'react-router-dom'

describe('Navbar test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <BrowserRouter>
          <Navbar/>
        </BrowserRouter>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

});