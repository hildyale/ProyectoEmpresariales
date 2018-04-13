import React, { Component } from 'react';
import './Main.css';

class Main extends Component {
  render() {
    return (
          <div className="main">
            <div className="mt-3">
            <h1>Busqueda de hogares</h1>
            </div>
            <div className="mt-3">
            <p>hola</p>
            <form>
              <div class="form-group">
                <label>Llegada: 
                <input type="date" name="bday" min="2018-01-01"/>
                </label>
                <label>Salida: 
                <input type="date" name="bday" min="2018-01-01"/>
                </label>
              </div>
              <div class="form-group">
                <label for="ciudad">Ciudad:</label>
                <select class="form-control" id="ciudad">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
              <div class="form-group">
              <label for="ciudad">Tipo:</label>
                <select class="form-control" id="ciudad">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </form>
            </div>
          </div>

    );
  }
}

export default Main;