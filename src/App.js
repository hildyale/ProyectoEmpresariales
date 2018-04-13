import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Main from './Components/Main';
import Footer from './Components/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <Main/>
          <Footer/>
      </div>
    );
  }
}

export default App;
