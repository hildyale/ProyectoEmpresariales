import React from 'react';
import ReactDOM from 'react-dom';
import MostrarHogares from './';

describe('MostrarHogares test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <MostrarHogares/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

});