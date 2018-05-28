import React from 'react';
import ReactDOM from 'react-dom';
import App from 'App';
import BusquedaHogar from 'components/BusquedaHogar';
import Login from 'components/Login';
import Page404 from 'components/Page404'
import { Route } from 'react-router';
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