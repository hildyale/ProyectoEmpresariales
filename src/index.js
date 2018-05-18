import React from 'react';
import ReactDOM from 'react-dom';
import 'popper.js/dist/umd/popper.min.js';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './index.css';
import App from './App';
import Page404 from './Components/Page404';
import BusquedaHogar from './Components/BusquedaHogar';
import Login from './Components/Login';
import Booking from './Components/Booking';
import { Route } from 'react-router';
import { BrowserRouter , Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={BusquedaHogar}/>
        <Route path="/Inicio" component={BusquedaHogar}/>
        <Route path="/Login" component={Login}/>
        <Route path="/Booking" component={Booking} />
        <Route component={Page404}/> 
      </Switch>
      </App>
    </BrowserRouter>
  ), document.getElementById('root'));

  registerServiceWorker();