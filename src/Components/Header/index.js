import React from "react";
import './Header.css';
import {logout} from "services/auth";
import LoginNav from 'components/LoginNav';

const appTokenKey = "appToken";
const firebaseUser = "userData";


export default class Header extends React.Component {

  constructor(props) {
    super(props);
    let User = null;
    if (typeof window.localStorage !== 'undefined') {
      User = JSON.parse(localStorage.getItem(firebaseUser))
    }
    this.state = {
      firebaseUser: User
    }
   //console.log("User:", this.state.firebaseUser.displayName);
    this.handleLogout = this.handleLogout.bind(this);
  
  }

  handleLogout() {
    //window.location.reload();
    logout().then( () => {
        localStorage.removeItem(appTokenKey);
        localStorage.removeItem(firebaseUser);
        //this.forceUpdate()
        //console.log("user signed out from firebase");
        window.location.reload();
    });
  }

  render() {
    let User = this.state.firebaseUser;
    if(User != null){
      return (
          <header className="Header">
            <img className="icon_login" src={User.photoURL} alt="Icon" width="35" height="35"/>
            <span> </span><span className="navbar-brand"> {User.displayName}<span className="navbar-com" > ({User.email})</span></span>
            <button type="submit" className="btn" onClick={this.handleLogout}>Cerrar sesión</button>
          </header>
      );
    }else{
      return(
        <header className="Header">
           <LoginNav/>
        </header>
      );
    }
  }  
}



/*render() {
  if(this.state.firebaseUser != null){
    let User = this.state.firebaseUser;
    return (
        <header className="Header">
          <img className="icon_login" src={User.photoURL} alt="Icon" width="32" height="32"/>
          <span> </span><span className="navbar-brand"> {User.displayName}<span className="navbar-com" > ({User.email})</span></span>
          <button type="submit" className="btn" onClick={this.handleLogout}>Cerrar sesión</button>
        </header>
    );
  }else{
    return(<div></div>)
  }
}*/
