import React, { Component } from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Header from 'components/Header';
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
          <Header/>
          <Navbar/>
          <div className="main">{children}</div>
          <Footer/>
      </div>
    );
  }
}

export default App;
