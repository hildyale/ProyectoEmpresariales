import React, { Component } from 'react';
import './MyBooking.css';
import MostrarReservas from 'components/MostrarReservas';
import LoginNeed from 'components/LoginNeed';
import ApiNode from 'services/ApiNode';
import ApiPrueba from 'services/ApiPrueba'

const appTokenKey = "appToken";
const firebaseUser = "userData";
const booking = {
  node: 'myBookingNode',
  scala: 'myBookingScala',
  python: 'myBookingPython'
}

class MyBooking extends Component{

  constructor(){
    super()
    this.state = {
      data : [null,null,null],
      result : "Mis Reservas"
    }
  }


  componentWillMount(){
    if (typeof window.sessionStorage === 'undefined') {
      return;
    }

    this.updateBooking("node");
    this.updateBooking("scala");
    this.updateBooking("python");
    
  }

  render(){
    if (typeof window.sessionStorage !== 'undefined') {
      let login = window.localStorage.getItem(firebaseUser); 
      if(typeof login === 'undefined'){
        return(<LoginNeed/>)
      }
    }

    return (
      <div className="myBooking">
        <h4 className="titulo">{this.state.result}</h4>
        <MostrarReservas data={this.state.data[0]}  />
        <MostrarReservas data={this.state.data[1]}  />
        <MostrarReservas data={this.state.data[2]}  />
      </div>
    );
  }


  updateBooking(Api){
    let apiCode,apiKey = null;
    if(Api==="node"){
      Api = ApiNode;
      apiKey = booking.node;
      apiCode = 0;
    }
    if(Api==="scala"){
      Api = ApiPrueba;
      apiKey = booking.scala;
      apiCode = 1;
    }
    if(Api==="python"){
      Api = ApiPrueba;
      apiKey = booking.python;
      apiCode = 2;
    }
    let reserva = window.sessionStorage.getItem(apiKey)
      if(reserva=== null){
        let token = window.localStorage.getItem(appTokenKey);
          Api.getBooking(token)   
          .then(data => {
              if(typeof data !== 'undefined'){
                window.sessionStorage.setItem(apiKey, JSON.stringify(data)); 
                let dataArray = this.state.data;
                dataArray[apiCode] = data; 
                this.setState({data:dataArray})          
              } 
            }) 
      }else{
        reserva = JSON.parse(reserva);
        let dataArray = this.state.data;
        dataArray[apiCode] = reserva; 
        this.setState({data:dataArray}) 
      }  
      this.comprobarDatos();
  }


  esVacio(data){
    if(data === null){
      return true;
    }
    if(typeof data.homes === 'undefined'){
      return true;
    }
    if(Object.keys(data.homes).length === 0){
      return true;
    }
    return false;
  }

  comprobarDatos(){
    let data = this.state.data;
    let datavacio = true;
    let data1vacio = true;
    let data2vacio = true;
    let result = "";

    datavacio = this.esVacio(data[0]);
    data1vacio = this.esVacio(data[1]);
    data2vacio = this.esVacio(data[2]);

    if(datavacio && data1vacio && data2vacio){
      result = "No tienes Reservas";
    }else{
      result = "Mis Reservas";
    }

    this.setState({
      result
    })
    
  }

}




export default MyBooking