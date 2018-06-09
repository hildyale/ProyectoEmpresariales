import React from 'react';
import ReactDOM from 'react-dom';
import 'popper.js/dist/umd/popper.min.js';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import App from 'App';
import Page404 from 'components/Page404';
import BusquedaHogar from 'components/BusquedaHogar';
import Booking from 'components/Booking';
import myBooking from 'components/MyBooking';
import { Route } from 'react-router';
import { BrowserRouter , Switch } from 'react-router-dom'
import registerServiceWorker from 'registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={BusquedaHogar}/>
        <Route path="/Inicio" component={BusquedaHogar}/>
        <Route path="/Booking" component={Booking} />
        <Route path="/MyBooking" component = {myBooking} />
        <Route component={Page404}/> 
      </Switch>
      </App>
    </BrowserRouter>
  ), document.getElementById('root'));

  registerServiceWorker();