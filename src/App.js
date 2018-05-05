import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired 
  };

  render() {
    const { children } = this.props;

    return (
      <div className="App">
          <Navbar/>
          <div className="main">{children}</div>
          <Footer/>
      </div>
    );
  }
}

export default App;