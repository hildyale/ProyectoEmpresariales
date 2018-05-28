import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

//const firebaseUser = "userData";

class Navbar extends Component {
  render() {
    /*
    let Login = false;
    if (typeof localStorage !== 'undefined') {
       Login = localStorage.getItem(firebaseUser);
    }*/
    return (
        <ul className="topnav">
          <li>
          <Link className="active" to="/"> <img src={require('utils/reyotearriendo/logo-4.png')} alt="Icon" width="42" height="42"/>YoTeArriendo<span className="com" >.com</span></Link>
          </li>
          <li>
            <Link className="noactive" to="/Inicio" >Inicio</Link>
          </li>
          <li>
            <Link className="noactive" to="/otro" >Otro</Link>
          </li>
        </ul>      
    );
  }
}

export default Navbar;

