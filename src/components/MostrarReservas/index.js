import React, { Component } from 'react';
import './MostrarReservas.css';
import {Link,Redirect} from 'react-router-dom';
import swal from 'sweetalert';

const firebaseUser = "userData";

class MostrarReservas extends Component {
  constructor(){
    super()
    this.state = {
      show: false,
      homes: [],
      agency: [],
      toBooking:false
    }
    this.alert = this.alert.bind(this);
  }

  updateData(){
    this.setState({
      homes: this.props.data.homes,
      agency: this.props.data.agency,
      checkIn: this.props.checkIn,
      checkOut: this.props.checkOut,
      show: true
    })
    console.log(this.props.data);  
  }

  deleteData(){
    this.setState({
      homes: [],
      agency: [],
      show: true
    })
  }

  alert(home){
    this.setState({home})
    if(typeof window.localStorage !== 'undefined'){
      if(window.localStorage.getItem(firebaseUser) === null){
        swal("Reservar", "Debes estar logeado para poder hacer la Reserva", "warning");
      }else{
        //this.setState({toBooking:true});
        this.deleteData();
      }
    }
  }

  render() {
    let homes = this.state.homes;
    let agency = this.state.agency;
    let checkIn = this.state.checkIn;
    let checkOut = this.state.checkOut;

    if (this.state.toBooking === true) {
      let home = this.state.home
      //return <Redirect to={{ pathname: './MyBooking', state: { agency,home,checkIn,checkOut} }} />
    }

    if(this.state.show && homes!==undefined && homes.length > 0){
    return (
      <div className="mostrarDatos">
       <ul>
          {
              homes.map((home, key) => {
                return(
                  <li key={key}>
                    <div className="container">
                      <div className="row">
                          <div className="col">
                           <center><img src={home.thumbnail} alt="thumbnail" width="150px" height="150px"/></center>
                          </div>
                          <div className="col">
                            <h4>{home.name}</h4>
                            <p>{home.description}</p>
                            <p>{home.location.address}</p>
                            <p>{home.city}</p>
                          </div>
                          <div className="col">
                            <h4>{home.type}</h4>
                            <h5>Precio</h5>
                            <p><b>Total:</b> {home.totalAmount}</p>
                            <p><b>Noche:</b> {home.pricePerNight}</p>
                          </div>
                         <div className="col">
                         </div>
                      </div>
                      <div className="row">
                          <div className="col-sm">
                           <h5>{agency[0].name}</h5>
                          </div>
                          <div className="col-sm">
                          <h5><b>Rating:</b> {home.rating}</h5>
                          </div>
                          <div className="col">
                           <button type="submit" className="btn" onClick={() => this.alert(home)}>Cancelar Reserva</button>
                           
                         </div>
                      </div>
                   </div>
                  </li>
              )})
            }
       </ul>
      </div>
    );
    }else{
      return(<div></div>);
    }
  }
}

export default MostrarReservas;
