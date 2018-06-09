import React, { Component } from 'react';
import './MostrarHogares.css';
import {Redirect} from 'react-router-dom';
import swal from 'sweetalert';

const firebaseUser = "userData";

class MostrarHogares extends Component {
  constructor(){
    super()
    this.state = {
      toBooking:false
    }
    this.alert = this.alert.bind(this);
  }

  render() {

    if(typeof this.props.data === 'undefined' || this.props.data === null){
      return(<div></div>);
    }

    let homes = this.props.data.homes;
    let agency = this.props.data.agency;
    let checkIn = this.props.checkIn;
    let checkOut = this.props.checkOut;

    if (this.state.toBooking === true) {
      let home = this.state.home
      return <Redirect to={{ pathname: '/Booking', state: { agency,home,checkIn,checkOut} }} />
    }

    if(homes!==undefined && agency!==undefined  && checkIn!==undefined  && checkOut!==undefined  && homes.length > 0){
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
                            <h5>{agency.name}</h5>
                            </div>
                            <div className="col-sm">
                            <h5><b>Rating:</b> {home.rating}</h5>
                            </div>
                            <div className="col">
                            <button type="submit" className="btn" onClick={() => this.alert(home)}>Reservar</button>
                            {/*<Link to={{ pathname: '/Booking', state: { agency,home,checkIn,checkOut} }}><button type="submit" className="btn">Reservar</button></Link>*/}
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


  alert(home){
    this.setState({home})
    if(typeof window.localStorage !== 'undefined'){
      if(window.localStorage.getItem(firebaseUser) === null){
        swal("Reservar", "Debes estar logeado para poder hacer la Reserva", "warning");
      }else{
        this.setState({toBooking:true});
      }
    }
  }

  
}

export default MostrarHogares;
