import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import BusquedaHogar from 'components/BusquedaHogar';
import Booking from 'components/Booking'
import MyBooking from 'components/MyBooking'
import Page404 from 'components/Page404'
import { Route } from 'react-router';
import { BrowserRouter , Switch } from 'react-router-dom'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });


describe('renders without crashing ', () =>{

  it('App', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <BrowserRouter>
      <App>
      <Switch>
        <Route exact path="/" component={BusquedaHogar}/>
        <Route path="/Inicio" component={BusquedaHogar}/>
        <Route path="/Booking" component={Booking} />
        <Route path="/MyBooking" component = {MyBooking} />
        <Route component={Page404}/> 
      </Switch>
      </App>
      </BrowserRouter>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });


});