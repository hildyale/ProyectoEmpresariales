import React, { Component } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {
    const path = window.location.pathname
    var active = [];
    switch (path) {
      case "/Inicio" :
        active[0] = "nav-item active";
        active[1] = "nav-item ";
       break;
      case "/Otro":
        active[0] = "nav-item ";
        active[1] = "nav-item active";
        break;
      default:
        active[0] = "nav-item active";
        active[1] = "nav-item ";
        break;
    }
    
    return (
        <nav className="navbar navbar-toggleable-md navbar-inverse ">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/"> <img src={require('../reyotearriendo/logo-4.png')} alt="Icon" width="42" height="42"/>YoTeArriendo<span className="navbar-com" >.com</span></Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className={active[0]} >
                <Link   to="/Inicio" >Inicio</Link>
              </li>
              <li className={active[1]}>
                <Link   to="/" >Otro</Link>
              </li>
              <li className="nav-item">
                  {/* <a className="nav-link disabled" href="#">Disabled</a> */}
              </li>
            </ul>
            {/*<form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Buscar"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
    </form>*/}
          </div>
        </nav>
    );
  }
}

export default Navbar;