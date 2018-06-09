import React, { Component } from 'react';
import './BusquedaHogar.css';
import MostrarHogares from 'components/MostrarHogares';
import ApiNode from 'services/ApiNode'
import ApiScala from 'services/ApiScala'
import ApiPython from 'services/ApiPython'
import ApiSpring from 'services/ApiSpring'

class BusquedaHogar extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    let date = new Date();
    let day = date.toISOString().substr(0, 10)
    date.setDate(date.getDate() + 1);
    let day2 = date.toISOString().substr(0, 10)

    this.state = {
      llegada: "",
      salida: "",
      ciudad: "CO-MDE",
      apartamento: true,
      casa: false,
      luxury: false,
      disabled: "disabled",
      minSalida: day2,
      minLlegada: day,
      resultado: false,
      data: "",
      data1: "",
      data2: "",
      data3: "",
      show: false,
      loading: false,
      result: "",
      checkIn: "",
      checkOut: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.comprobarDatos = this.comprobarDatos.bind(this);
    this.llamadoApis = this.llamadoApis.bind(this);
    this.verificarRespuesta = this.verificarRespuesta.bind(this);
  }

  render() {
    return (
      <div className="BusquedaHogar">
        <div className="Titulo">
          <h1>Búsqueda de hogares</h1>
        </div>
        <div className="MenuPrincipal" >
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Llegada:
                  <input className="form-control" id="llegada" type="date" name="llegada" onChange={this.handleChange} min={this.state.minLlegada} max="5000-01-01" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required />
              </label>
              <label>Salida:
                  <input className="form-control" id="salida" type="date" name="salida" onChange={this.handleChange} min={this.state.minSalida} disabled={this.state.disabled} max="5000-01-01" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="ciudad">Ciudad:
                  <select className="form-control" id="ciudad" onChange={this.handleChange} title="Ciudad">
                  <option value="CO-MDE">Medellín</option>
                  <option value="CO-CLO">Cali</option>
                  <option value="CO-BOG">Bogotá</option>
                  <option value="CO-CTG">Cartagena</option>
                  <option value="CO-SMR">Santa Marta</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>Tipo: <br />
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" checked={this.state.apartamento} id="apartamento" onChange={this.handleChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description"> Apartamento</span>
                </label>
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" checked={this.state.casa} id="casa" onChange={this.handleChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description"> Casa</span>
                </label>
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" checked={this.state.luxury} id="luxury" onChange={this.handleChange} />
                  <span className="custom-control-indicator"></span>
                  <span className="custom-control-description"> Luxury</span>
                </label>
              </label>
            </div>

            <button type="submit" className="btn">Buscar</button>
            <span className={this.state.resultado ? 'alert' : 'hidden'}>{this.state.resultado}</span>
          </form>
        </div>
        <center><img src={require('images/loading2.svg')} className={this.state.loading ? 'showOpacity' : 'hiddenOpacity'} alt="loading" /></center>
        <h4 className={this.state.show ? 'showOpacity' : 'hiddenOpacity '}>{this.state.result}</h4>

        <MostrarHogares data={this.state.data} checkIn={this.state.checkIn} checkOut={this.state.checkOut} />
        <MostrarHogares data={this.state.data1} checkIn={this.state.checkIn} checkOut={this.state.checkOut} />
        <MostrarHogares data={this.state.data2} checkIn={this.state.checkIn} checkOut={this.state.checkOut} />
        <MostrarHogares data={this.state.data3} checkIn={this.state.checkIn} checkOut={this.state.checkOut} />
      </div>

    );
  }


  componentWillMount() {
    if (typeof this.props.location === 'undefined' && typeof window.localStorage === 'undefined') {
      return;
    }
    /*
    if(typeof this.props.location.state !== 'undefined'){
      let state = JSON.parse(this.props.location.state.state);
      this.setState(state);
      return;
    }
    if(typeof window.localStorage.getItem('state') !== 'undefined'){
        window.localStorage.removeItem('state');
    }
    */
    if (typeof window.sessionStorage !== 'undefined') {
      if (typeof window.sessionStorage.getItem('state') !== 'undefined') {
        let state = window.sessionStorage.getItem('state');
        state = JSON.parse(state);
        this.setState(state);
      }
    }
  }

  componentDidMount() {
    if (typeof window.localStorage !== 'undefined') {
      if (typeof window.localStorage.getItem('state') !== 'undefined') {  // antes: typeof this.props.location !== 'undefined'  y typeof this.props.location.state !== 'undefined'
        let llegada = document.getElementById('llegada');
        llegada.value = this.state.llegada;
        let salida = document.getElementById('salida');
        salida.value = this.state.salida;
        let ciudad = document.getElementById('ciudad');
        ciudad.value = this.state.ciudad;
      }
    }
  }

  handleChange(event) {
    var input = event.target.id;
    if (input === "llegada") {
      var startDate = new Date(Date.parse(event.target.value));
      startDate.setDate(startDate.getDate() + 1);
      let day = startDate.toISOString().substr(0, 10)
      this.setState({ disabled: "", minSalida: day })
    }

    if (input === "apartamento") {
      this.setState({
        apartamento: true,
        casa: false,
        luxury: false
      });
      return;
    }
    if (input === "casa") {
      this.setState({
        apartamento: false,
        casa: true,
        luxury: false
      });
      return;
    }
    if (input === "luxury") {
      this.setState({
        apartamento: false,
        casa: false,
        luxury: true
      });
      return;
    }
    this.setState({ [input]: event.target.value });

    //console.log(input+' -- '+event.target.value);
    //console.log(this.state);
  }

  handleSubmit(event) {
    let datos = {};
    let type = "";
    let apartamento = this.state.apartamento;
    let casa = this.state.casa;
    let luxury = this.state.luxury;
    let llegada = this.state.llegada;
    let dia = llegada.substr(8, 2);
    let mes = llegada.substr(5, 2);
    let año = llegada.substr(0, 4);
    let checkIn = dia + "-" + mes + "-" + año;
    let salida = this.state.salida;
    dia = salida.substr(8, 2);
    mes = salida.substr(5, 2);
    año = salida.substr(0, 4);
    let checkOut = dia + "-" + mes + "-" + año;
    //console.log(checkIn);
    this.setState({
      loading: true,
      show: false,
      result: "",
      checkIn,
      checkOut,
      data: "",
      data1: "",
      data2: ""
    });

    if (apartamento) {
      type = "1";
    }
    if (casa) {
      type = "2";
    }
    if (luxury) {
      type = "3";
    }
    datos = {
      checkIn: checkIn,
      checkOut: checkOut,
      city: this.state.ciudad,
      type
    };
    this.llamadoApis(datos);
    this.timer = setTimeout(this.verificarRespuesta, 15000);
    event.preventDefault();
  }

  llamadoApis(datos) {
    //llamado de la api de node
    ApiNode.getHomes(datos)
      .then(data => {
        if (typeof data !== 'undefined') {
          this.setState({
            data
          });
        } else {
          this.setState({
            data: null
          });
        }
        this.comprobarDatos();
      })

    //llamado de la api de scala
    ApiScala.getHomes(datos)
      .then(data => {
        if (typeof data !== 'undefined') {
          this.setState({
            data1: data
          });
        } else {
          this.setState({
            data1: null
          });
        }
        this.comprobarDatos();
      })
      .catch(error => console.log(error));

    //llamado de la api de python
    ApiPython.getHomes(datos)
      .then(data => {
        if (typeof data !== 'undefined') {
          this.setState({
            data2: data
          });
        } else {
          this.setState({
            data2: null
          });
        }
        this.comprobarDatos();
      })
      .catch(error => console.log(error));

    //llamado de la api de scala
    ApiSpring.getHomes(datos)
      .then(data => {
        if (typeof data !== 'undefined') {
          this.setState({
            data3: data
          });
        } else {
          this.setState({
            data3: null
          });
        }
        this.comprobarDatos();
      })
      .catch(error => console.log(error));


  }


  esVacio(data) {
    if (typeof data === 'undefined') {
      return true;
    }
    if (data === null) {
      return true;
    }
    if (data === "") {
      return true;
    }
    if (typeof data.homes === 'undefined') {
      return true;
    }

    if (Object.keys(data.homes).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  comprobarDatos() {
    let data = this.state.data;/**/
    let data1 = this.state.data1;
    let data2 = this.state.data2;
    let data3 = this.state.data3;
    let datavacio = true;
    let data1vacio = true;
    let data2vacio = true;
    let data3vacio = true;
    let result = "";

    datavacio = this.esVacio(data);
    data1vacio = this.esVacio(data1);
    data2vacio = this.esVacio(data2);
    data3vacio = this.esVacio(data2);

    if (datavacio && data1vacio && data2vacio && data3vacio) {
      result = "0 Resultados";
    } else {
      result = "Resultados de la Búsqueda";
    }

    if (data !== "" && data1 !== "" && data2 !== "" && data3 !== "" ) {
      this.setState({
        loading: false
      })
    }

    this.setState({
      result,
      show: true,
    })

    window.sessionStorage.setItem("state", JSON.stringify(this.state));

  }

  verificarRespuesta() {
    let data = this.state.data;
    let data1 = this.state.data1;
    let data2 = this.state.data2;
    let data3 = this.state.data3;

    if (data === "") {
      data = null;
    }
    if (data1 === "") {
      data1 = null;
    }
    if (data2 === "") {
      data2 = null;
    }
    if (data3 === "") {
      data2 = null;
    }
    this.setState({
      data,
      data1,
      data2,
      data3
    })
    this.comprobarDatos();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }


}

export default BusquedaHogar;