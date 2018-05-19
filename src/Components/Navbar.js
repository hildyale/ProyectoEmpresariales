import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import LoginNav from './LoginNav';
const firebaseUser = "userData";

class Navbar extends Component {
  render() {
    //localStorage.getItem(firebaseUser) != null
    return (
        <nav className="navbar navbar-toggleable-md navbar-inverse ">
          <Link className="navbar-brand" to="/"> <img src={require('../reyotearriendo/logo-4.png')} alt="Icon" width="42" height="42"/>YoTeArriendo<span className="navbar-com" >.com</span></Link>
      
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to="/Inicio" >Inicio</Link>
              </li>
              <li>
                <Link to="/otro" >Otro</Link>
              </li>
              <li>
                <Link className={localStorage.getItem(firebaseUser)? 'hidden' : 'showButton'} to="/login" >Login</Link>
              </li>
            </ul>
     
          <LoginNav/>
          
        </nav>
    );
  }
}

export default Navbar;

{/*<form className="form-inline mt-2 mt-md-0">
<input className="form-control mr-sm-2" type="text" placeholder="Buscar"/>
<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
</form>*/}