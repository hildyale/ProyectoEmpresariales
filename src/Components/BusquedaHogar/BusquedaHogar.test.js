import React from 'react';
import ReactDOM from 'react-dom';
import BusquedaHogar from './';

describe('BusquedaHogar test ', () =>{

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render((
        <BusquedaHogar/>
      ), div);
      ReactDOM.unmountComponentAtNode(div);
  });

});