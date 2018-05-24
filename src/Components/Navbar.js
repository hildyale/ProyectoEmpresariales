import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import LoginNav from './LoginNav';
const firebaseUser = "userData";

class Navbar extends Component {
  render() {
    let Login = false;
    if (typeof localStorage !== 'undefined') {
       Login = localStorage.getItem(firebaseUser);
    }
    return (
        <ul className="topnav">
          <li>
          <Link className="active" to="/"> <img src={require('../reyotearriendo/logo-4.png')} alt="Icon" width="42" height="42"/>YoTeArriendo<span className="com" >.com</span></Link>
          </li>
          <li>
            <Link className="noactive" to="/Inicio" >Inicio</Link>
          </li>
          <li>
            <Link className="noactive" to="/otro" >Otro</Link>
          </li>
          <li>
            <Link className={Login ? 'hidden' : 'showButton noactive'} to="/login" >Login</Link>
          </li>
          <li className={Login ? 'hidden' : 'showButton noactive right'}>
            <LoginNav/>
          </li>
        </ul>      
    );
  }
}

export default Navbar;

