import React, { Component } from 'react';
import './BusquedaHogar.css';

class BusquedaHogar extends Component {
  constructor(){
      var date = new Date();
      var day = date.toISOString().substr(0,10)
     super()
     this.state = {
      llegada :"",
      salida : "",
      ciudad : "CO-MDE",
      apartamento: false,
      casa: false,
      luxury: false,
      disabled : "disabled",
      minSalida: day,
      minLlegada: day,
      resultado: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
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
      if(event.target.checked){
        this.setState({[input]: true});
      }else{
        this.setState({[input]: false});
      }
    }else{
      this.setState({[input]: event.target.value});
    }
    console.log(input+' -- '+event.target.value);
    //console.log(this.state);
  }

  handleSubmit(event) {
    let datos = {};
    let apartamento = this.state.apartamento;
    let casa = this.state.casa;
    let luxury = this.state.luxury;
    let date = new Date(Date.parse(this.state.llegada));
    let checkIn = date.getDate() + 1 + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    date = new Date(Date.parse(this.state.salida));
    let checkOut = date.getDate() + 1 + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    if(!apartamento&&!casa&&!luxury){
      this.setState({
        resultado: "Debe seleccionar por lo menos un tipo de Hogar"
      })  
    }else{
      this.setState({
        resultado: false
      })  
      apartamento = (apartamento) ? "1" : "0";
      casa = (casa) ? "2" : "0";
      luxury = (luxury) ? "3" : "0";
      datos = {
        checkIn : checkIn,
        checkOut : checkOut,
        city : this.state.ciudad,
        type: [apartamento,
              casa,
              luxury
              ]
        }
        console.log(datos);
        fetch('/api1/v1/homes/search', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: datos
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
    event.preventDefault();
  }

  render() {
    return (
          <div className="BusquedaHogar">
            <div className="mt-3">
            <h1>Busqueda de hogares</h1>
            </div>
            <div className="mt-3">
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
                <label htmlFor="ciudad">Ciudad:</label>
                <select className="form-control"  id="ciudad" onChange={this.handleChange} title="Ciudad">
                  <option value="CO-MDE">Medellín</option>
                  <option value="CO-CLO">Cali</option>
                  <option value="CO-BOG">Bogotá</option>
                  <option value="CO-CTG">Cartagena</option>
                  <option value="CO-SMR">Santa Marta</option>
                </select>
              </div>
              <div className="form-group">
              <label htmlFor="tipo">Tipo:</label>

                  <div className="checkbox">
                  <label><input type="checkbox" id="apartamento" onChange={this.handleChange}/>Apartamento</label>
                  </div>
                  <div className="checkbox">
                  <label><input type="checkbox" id="casa" onChange={this.handleChange}/>Casa</label>
                  </div>
                  <div className="checkbox">
                  <label><input type="checkbox" id="luxury" onChange={this.handleChange}/>Luxury</label>
                  </div>
       
              </div>
              {/*<div className="form-group">
              <label htmlFor="tipo">Tipo:</label>
                <select className="form-control"  id="tipo"  value={this.state.tipo}  onChange={this.handleChange} title="Tipo" multiple>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa">Casa</option>
                  <option value="luxury">Luxury</option>
                </select>
               </div>*/}
               <button type="submit" className="btn btn-success">Buscar</button>
               <span className={this.state.resultado ? 'alert' : 'hidden'}>{this.state.resultado}</span>
            </form>
            </div>
          </div>

    );
  }
}

export default BusquedaHogar;