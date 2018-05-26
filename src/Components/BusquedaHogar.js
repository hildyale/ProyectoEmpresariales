import React, { Component } from 'react';
import './BusquedaHogar.css';
import MostrarHogares from './MostrarHogares';

class BusquedaHogar extends Component {
  constructor(props){
    super(props);
    let date = new Date();
    let day = date.toISOString().substr(0,10)
    date.setDate(date.getDate() + 1);
    let day2 = date.toISOString().substr(0,10)
    
    this.state = {
        llegada :"",
        salida : "",
        ciudad : "CO-MDE",
        apartamento: true,
        casa: false,
        luxury: false,
        disabled : "disabled",
        minSalida: day2,
        minLlegada: day,
        resultado: false,
        data: "",
        data1: "",
        data2: "",
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
      this.child = React.createRef();
      this.child1 = React.createRef();
      this.child2 = React.createRef();
  }


  componentWillMount(){
    if(this.props.location.state !== undefined){
      let state = JSON.parse(this.props.location.state.state);
      this.setState(state);
      console.log(state);
    }else{
      if(localStorage.getItem('state') !== undefined){
        localStorage.removeItem('state');
      }
    }
  }

  componentDidMount(){
    if(this.props.location.state !== undefined){
      this.child.current.updateData();
      this.child1.current.updateData();
      this.child2.current.updateData();
      let llegada = document.getElementById('llegada');
      llegada.value = this.state.llegada;
      let salida = document.getElementById('salida');
      salida.value = this.state.salida;
      let ciudad = document.getElementById('ciudad');
      ciudad.value = this.state.ciudad;
    }
  }

  handleChange(event) {
    var input = event.target.id;
    if(input === "llegada"){
      var startDate = new Date(Date.parse(event.target.value));
      startDate.setDate(startDate.getDate() + 1);
      let day = startDate.toISOString().substr(0,10)
      this.setState({disabled: "",minSalida:day})
    }
    if(input === "apartamento" ||input === "casa" || input === "luxury"){
      if(input === "apartamento"){
        this.setState({
          apartamento: true,
          casa: false,
          luxury: false
        });
      }
      if(input === "casa"){
        this.setState({
          apartamento: false,
          casa: true,
          luxury: false
        });
      }
      if(input === "luxury"){
        this.setState({
          apartamento: false,
          casa: false,
          luxury: true
        });
      }
    }else{
      this.setState({[input]: event.target.value});
    }
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
    let dia = llegada.substr(8,2);
    let mes = llegada.substr(5,2);
    let año = llegada.substr(0,4);
    let checkIn = dia+"-"+mes+"-"+año;
    let salida = this.state.salida;
    dia = salida.substr(8,2);
    mes = salida.substr(5,2);
    año = salida.substr(0,4);
    let checkOut = dia+"-"+mes+"-"+año;
    //console.log(checkIn);
    this.setState({
      loading:true,
      show: false,
      result: "",
      checkIn,
      checkOut,
      data: "",
      data1: "",
      data2: ""
    });
    this.child.current.deleteData();
    this.child1.current.deleteData();
    this.child2.current.deleteData();

    if(!apartamento&&!casa&&!luxury){
      this.setState({
        resultado: "Debe seleccionar por lo menos un tipo de Hogar"
      })  
    }else{
      this.setState({
        resultado: false
      })  
      if(apartamento){
        type = "1";
      }else{
        if(casa){
          type = "2";
        }else{
          type = "3";
        }
      }
      datos = JSON.stringify({
        checkIn : checkIn,
        checkOut : checkOut,
        city : this.state.ciudad,
        type
      })
      this.llamadoApis(datos);
      event.preventDefault();
    }
}

  llamadoApis(datos){
  //llamado de la api de node
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
    targetUrl = 'https://backend-arrendamiento-jansel.herokuapp.com/v1/homes/search';
    fetch(proxyUrl + targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: datos
    }).then(response => response.json())
    .then(data => {
      this.setState({
        data
      });
      this.child.current.updateData();
      this.comprobarDatos();
    })
    .catch(error => console.log(error));

  //llamado de la api de scala
    proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    targetUrl = 'https://scad-app-empresariales.herokuapp.com/v1/homes/search';
    fetch(proxyUrl + targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: datos
    }).then(response => response.json())
    .then(data => {
      this.setState({
        data1:data
      });
      this.child1.current.updateData();
      this.comprobarDatos();
    })
    .catch(error => console.log(error));

  //llamado de la api de scala
    proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    targetUrl = 'https://pawpatrolhouses.herokuapp.com/v1/homes/search';
    fetch(proxyUrl + targetUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: datos
    }).then(response => response.json())
    .then(data => {
      this.setState({
        data2:data
      });
      this.child2.current.updateData();
      this.comprobarDatos();
    })
    .catch(error => console.log(error));

}

  comprobarDatos(){
    let data = this.state.data;/**/
    let data1 = this.state.data1;
    let data2 = this.state.data2;
    let datavacio = true;
    let data1vacio = true;
    let data2vacio = true;
    let result = "";

    if(!(data === "" && data1 === "" && data2 ==="")){
      if(data.homes !== undefined){
        if(Object.keys(data.homes).length === 0){
          datavacio = true;
        }else{
          datavacio = false;
        }
      }else{
        datavacio = true;
      }

      if(data1.homes !== undefined){
        if(Object.keys(data1.homes).length === 0){
          data1vacio = true;
        }else{
          data1vacio = false;
        }
      }else{
        data1vacio = true;
      }

      if(data2.homes !== undefined){
        if(Object.keys(data2.homes).length === 0){
          data2vacio = true;
        }else{
          data2vacio = false;
        }
      }else{
        data2vacio = true;
      }

      if(datavacio && data1vacio && data2vacio){
        result = "0 Resultados";
      }else{
        result = "Resultados de la Búsqueda";
      }

      if(data !== "" && data1 !== "" && data2 !== ""){
         this.setState({
          loading: false
         })
      }
      
      this.setState({
        result,
        show: true,
      })

      localStorage.setItem("state", JSON.stringify(this.state));
    }
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
                  <input className="form-control" id="llegada" type="date" name="llegada"   onChange={this.handleChange} min={this.state.minLlegada} max="5000-01-01" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required/>
                  </label>
                  <label>Salida: 
                  <input className="form-control" id="salida" type="date" name="salida"  onChange={this.handleChange} min={this.state.minSalida} disabled={this.state.disabled} max="5000-01-01"  pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" required/>
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="ciudad">Ciudad:
                  <select className="form-control"  id="ciudad" onChange={this.handleChange} title="Ciudad">
                    <option value="CO-MDE">Medellín</option>
                    <option value="CO-CLO">Cali</option>
                    <option value="CO-BOG">Bogotá</option>
                    <option value="CO-CTG">Cartagena</option>
                    <option value="CO-SMR">Santa Marta</option>
                  </select>
                  </label>
                </div>

                <div className="form-group">
                  <label>Tipo: <br/>
                    <label className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" checked={this.state.apartamento} id="apartamento" onChange={this.handleChange}/>
                      <span className="custom-control-indicator"></span>
                      <span className="custom-control-description"> Apartamento</span>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" checked={this.state.casa} id="casa" onChange={this.handleChange}/>
                      <span className="custom-control-indicator"></span>
                      <span className="custom-control-description"> Casa</span>
                    </label>
                    <label className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" checked={this.state.luxury} id="luxury" onChange={this.handleChange}/>
                      <span className="custom-control-indicator"></span>
                      <span className="custom-control-description"> Luxury</span>
                    </label>
                  </label>
                </div>

                <button type="submit" className="btn">Buscar</button>
                <span className={this.state.resultado ? 'alert' : 'hidden'}>{this.state.resultado}</span>
              </form>
            </div>
            <img src={require('../img/loading2.svg')} className={this.state.loading ? 'show' : 'hidden'} alt="loading" />
            <h4 className={this.state.show ? 'show' : 'hidden '}>{this.state.result}</h4>
            
            <MostrarHogares data={this.state.data} checkIn={this.state.checkIn} checkOut={this.state.checkOut} ref={this.child}/>
            <MostrarHogares data={this.state.data1} checkIn={this.state.checkIn} checkOut={this.state.checkOut} ref={this.child1}/>
            <MostrarHogares data={this.state.data2} checkIn={this.state.checkIn} checkOut={this.state.checkOut} ref={this.child2}/>
          </div>

    );
  }
}

export default BusquedaHogar;