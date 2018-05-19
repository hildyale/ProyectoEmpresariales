import React from "react";
import './Header.css';
import {logout} from "../utils/auth";

const appTokenKey = "appToken";
const firebaseUser = "userData";


export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firebaseUser: JSON.parse(localStorage.getItem(firebaseUser))
    }
   //console.log("User:", this.state.firebaseUser.displayName);
    this.handleLogout = this.handleLogout.bind(this);
    this.localStorageUpdated = this.localStorageUpdated.bind(this);
  
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
        //this.setState({status: localStorage.getItem('localstorage-status') ? true : false})
        window.addEventListener('storage', this.localStorageUpdated)
    }
  }

  localStorageUpdated(){
    this.setState({
      firebaseUser: JSON.parse(localStorage.getItem(firebaseUser))
    })
  }

  

  handleLogout() {
    //window.location.reload();
    logout().then( () => {
        localStorage.removeItem(appTokenKey);
        localStorage.removeItem(firebaseUser);
        this.forceUpdate()
        //console.log("user signed out from firebase");
    });
  }

  render() {
    if(JSON.parse(localStorage.getItem(firebaseUser)) != null){
      let User = JSON.parse(localStorage.getItem(firebaseUser));
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
