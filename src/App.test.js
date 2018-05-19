import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Page404 from './Components/Page404';
import BusquedaHogar from './Components/BusquedaHogar';
import Login from './Components/Login';
import MostrarHogares from './Components/MostrarHogares';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';
import Booking from './Components/Booking';
import { Route } from 'react-router';
import { BrowserRouter , Switch } from 'react-router-dom'

describe('renders without crashing ', () =>{
/*
  it('App', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={BusquedaHogar}/>
          <Route path="/Inicio" component={BusquedaHogar}/>
          <Route path="/Login" component={Login}/>
          <Route component={Page404}/> 
        </Switch>
        </App>
      </BrowserRouter>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });
*/
  it('BusquedaHogar', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <BusquedaHogar/>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('MostrarHogares', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <MostrarHogares/>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  /*it('Navbar', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <BrowserRouter>
       <Navbar/>
      </BrowserRouter>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });
  */
 
  it('Footer', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Footer/>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Page404', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Page404/>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });

  /*it('Booking', () => {
    const div = document.createElement('div');
    ReactDOM.render((
      <Booking/>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
  });*/

});