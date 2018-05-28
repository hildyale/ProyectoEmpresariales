import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import BusquedaHogar from 'Components/BusquedaHogar';
import Login from 'Components/Login';
import { Route } from 'react-router';
import Page404 from 'Components/Page404'
import { BrowserRouter , Switch } from 'react-router-dom'

describe('renders without crashing ', () =>{

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
  

});