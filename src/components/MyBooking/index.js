import React, { Component } from 'react';
import './MyBooking.css';
import MostrarReservas from 'components/MostrarReservas';
import LoginNeed from 'components/LoginNeed';
import ApiNode from 'services/ApiNode';
import ApiPython from 'services/ApiPython'
import ApiScala from 'services/ApiScala'

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
    this.timer = null;
    this.state = {
      data : [null,null,null],
      result : "Mis Reservas"
    }
    this.verificarRespuesta = this.verificarRespuesta.bind(this);
  }


  componentDidMount(){
    if (typeof window.sessionStorage === 'undefined') {
      return;
    }

    this.updateBooking("node");
    this.updateBooking("scala");
    this.updateBooking("python");
    this.timer = setTimeout(this.verificarRespuesta,15000);
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
        <MostrarReservas data={this.state.data[0]}  updateBooking={(apiname)=> this.updateBooking(apiname)}/>
        <MostrarReservas data={this.state.data[1]}  updateBooking={(apiname)=> this.updateBooking(apiname)}/>
        <MostrarReservas data={this.state.data[2]}  updateBooking={(apiname)=> this.updateBooking(apiname)}/>
      </div>
    );
  }


  updateBooking(ApiName){
    let apiCode,apiKey,Api = null;
    if(ApiName==="node"){
      Api = ApiNode;
      apiKey = booking.node;
      apiCode = 0;
    }
    if(ApiName==="scala"){
      Api = ApiScala;
      apiKey = booking.scala;
      apiCode = 1;
    }
    if(ApiName==="python"){
      Api = ApiPython;
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
                this.comprobarDatos();          
              }else{
                let dataArray = this.state.data;
                dataArray[apiCode] = ApiName; 
                this.setState({data:dataArray}) 
                this.comprobarDatos(); 
              } 
            }) 
      }else{
        reserva = JSON.parse(reserva);
        let dataArray = this.state.data;
        dataArray[apiCode] = reserva; 
        this.setState({data:dataArray})
        this.comprobarDatos(); 
      }  
  }


  esVacio(data){
    if(data === "node" || data=== "scala" || data === "python"){
      return true;
    }
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

    if(data[0]!== null && data[1]!== null && data[2]!==null){
      if(datavacio && data1vacio && data2vacio){
        result = "No tienes Reservas";
      }else{
        result = "Mis Reservas";
      }
    }

    this.setState({
      result
    })
    
  }


  verificarRespuesta(){
    let data = this.state.data;
    if (data[0] === null){
      data[0] = "";
    }
    if (data[1] === null){
      data[1] = "";
    }
    if (data[2] === null){
      data[2] = "";
    }
    this.setState({
      data
    })
    this.comprobarDatos();
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

}




export default MyBooking