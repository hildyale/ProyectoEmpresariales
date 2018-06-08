import React, { Component } from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Header from 'components/Header';
import PropTypes from 'prop-types';
import {firebaseAuth} from "config/constants";
import './App.css';

const appTokenKey = "appToken";
const firebaseUser = "userData";

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired 
  };

  componentWillMount(){
    firebaseAuth().onAuthStateChanged(user => {
      if (user) {
          localStorage.setItem(firebaseUser, JSON.stringify(user));
          user.getIdToken().then((idtoken)=> {
            localStorage.setItem(appTokenKey, idtoken);
        }) 
      }
    });
  }

  render() {
    const { children } = this.props;

    return (
      <div className="App">
          <Header/>
          <Navbar/>
          <div className="main">{children}</div>
          <Footer/>
      </div>
    );
  }
}

export default App;
