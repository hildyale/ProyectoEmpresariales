import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
        <footer className="footer">
        <img src={require('utils/reyotearriendo/logo-4.png')} alt="Icon" width="32" height="32"/>
        <span className="navbar-brand">YoteArriendo<span className="navbar-com" >.com</span> - UdeA - Medellín.</span>
        </footer>
    );
  }
}

export default Footer;