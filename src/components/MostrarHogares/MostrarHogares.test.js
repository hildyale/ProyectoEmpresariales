import React from 'react';
import ReactDOM from 'react-dom';
import MostrarReservas from './';

describe('MostrarReservas test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <MostrarReservas/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

});