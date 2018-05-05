import React, { Component } from 'react';
import './BusquedaHogar.css';
import MostrarDatos from './MostrarDatos';

class BusquedaHogar extends Component {
  constructor(){
      var date = new Date();
      var day = date.toISOString().substr(0,10)
     super()
     this.state = {
      llegada :"",
      salida : "",
      ciudad : "CO-MDE",
      apartamento: true,
      casa: false,
      luxury: false,
      disabled : "disabled",
      minSalida: day,
      minLlegada: day,
      resultado: false,
      data: {},
      data1: {},
      show: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.child = React.createRef();
      this.child1 = React.createRef();
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
    console.log(input+' -- '+event.target.value);
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
    console.log(checkIn);
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
        console.log(datos);

  /*************************************************************************************************************************************/
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
          this.setState({data,show:true});
          this.child.current.updateData();
        })
        .catch(error => console.log(error));

  /*************************************************************************************************************************************/
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
          this.setState({data1:data,show:true});
          this.child1.current.updateData();
        })
        .catch(error => console.log(error));

  /*************************************************************************************************************************************/
  //llamado de la api de scala
  /*
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
        this.setState({data2:data,show:true});
        this.child1.current.updateData();
      })
      .catch(error => console.log(error));
      */
    }
    event.preventDefault();
  }

  render() {
    let data = Object.keys(this.state.data);/**/
    let data1 = this.state.data1;
    let result = "";
    let data1vacio = true;
    console.log(data.length);
    console.log(data1.homes);
    
    if(data1.homes !== undefined){
      if(Object.keys(data1.homes).length === 0){
        data1vacio = true;
      }else{
        data1vacio = false;
      }
    }else{
      data1vacio = true;
    }

    if(data.length < 2 && data1vacio){
      result = "0 Resultados"
    }else{
      result = "Resultados de la Búsqueda"
    }
    
    console.log(result);
    
    
    return (
          <div className="BusquedaHogar">
            <div className="Titulo">
            <h1>Búsqueda de hogares</h1>
            </div>
            <div className="MenuPrincipal" >
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Llegada: 
                <input className="form-control" id="llegada" type="date" name="llegada"   onChange={this.handleChange} min={this.state.minLlegada} required/>
                </label>
                <label>Salida: 
                <input className="form-control" id="salida" type="date" name="salida"  onChange={this.handleChange} min={this.state.minSalida} disabled={this.state.disabled} required/>
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
              {/*}
              <div className="form-group">
              <label htmlFor="tipo">Tipo:</label>

                  <div className="checkbox">
                  <label><input type="checkbox" name="fancy-checkbox-default" checked={this.state.apartamento} id="apartamento" onChange={this.handleChange}/> Apartamento</label>
                  </div>
                  <div className="checkbox">
                  <label><input type="checkbox" checked={this.state.casa} id="casa" onChange={this.handleChange}/> Casa</label>
                  </div>
                  <div className="checkbox">
                  <label><input type="checkbox" checked={this.state.luxury} id="luxury" onChange={this.handleChange}/> Luxury</label>
                  </div>
       
              </div>*/}

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
            <h4 className={this.state.show ? 'show' : 'hidden'}>{result}</h4>
            <MostrarDatos data={this.state.data} ref={this.child}/>
            <MostrarDatos data={this.state.data1} ref={this.child1}/>
          </div>

    );
  }
}

export default BusquedaHogar;