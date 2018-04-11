import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <nav className="navbar navbar-toggleable-md navbar-inverse ">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="#">Fixed navbar</a>
            <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
            <a className="nav-link disabled" href="#">Disabled</a>
            </li>
            </ul>
            <form className="form-inline mt-2 mt-md-0">
              <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            </div>
          </nav>

          <div className="main">
            <div className="mt-3">
            <h1>Sticky footer with fixed navbar</h1>
            </div>
            <p className="lead">Pin a fixed-height footer to the bottom of the viewport in desktop browsers with this custom HTML and CSS. A fixed navbar has been added with <code>padding-top: 60px;</code> on the <code>body &gt; .container</code>.</p>
            <p>Back to <a href="../sticky-footer">the default sticky footer</a> minus the navbar.</p>
          </div>

          <footer className="footer">
            <div className="container">
            <span className="text-muted">Place sticky footer content here.</span>
            </div>
          </footer>
      </div>
    );
  }
}

export default App;
