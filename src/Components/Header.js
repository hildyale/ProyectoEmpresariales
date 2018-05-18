import React from "react";
import './Header.css';
import {logout} from "../utils/auth";

const appTokenKey = "appToken";
const firebaseUser = "userData";

export default class Header extends React.Component {

  constructor(props) {
    super(props);

   //console.log("User:", this.state.firebaseUser.displayName);
    this.handleLogout = this.handleLogout.bind(this);
  }


  handleLogout() {
    logout().then(function () {
        localStorage.removeItem(appTokenKey);
        localStorage.removeItem(firebaseUser);
        
        //this.props.history.push("/Inicio");
        console.log("user signed out from firebase");
    }.bind(this));
  }

  render() {
    if(localStorage.getItem(firebaseUser) != null){
      this.state = {        
        firebaseUser: JSON.parse(localStorage.getItem(firebaseUser))
      }
      return (
          <header className="Header">
            <img className="icon_login" src={this.state.firebaseUser.photoURL} alt="Icon" width="32" height="32"/>
            <span> </span><span className="navbar-brand"> {this.state.firebaseUser.displayName}<span className="navbar-com" > ({this.state.firebaseUser.email})</span></span>
            <button type="submit" className="btn" onClick={this.handleLogout}>Cerrar sesión</button>
          </header>
      );
    }else{
      return(<p></p>)
    }
  }
}
