import React, { Component } from 'react';
import './Booking.css';
import Page404 from './Page404';

class Booking extends Component {
  constructor(props){
      super()
      this.state = {
        params: props.location.state
      }
      this.onClick = this.onClick.bind(this);
  }

  onClick(){
   console.log('reserva');
   let home = this.state.params.home;
   let checkIn = this.state.params.checkIn;
   let checkOut = this.state.params.checkOut;
   let reserva = {
       checkIn,
       checkOut,
       id: home.id
   }
   console.log(reserva);
  }

  render() {
    let params = this.state.params
    if(params !== undefined){  
        let agency = params.agency;
        let home = params.home;
        
        return (
            <div className="Booking">
                <h1>Reserva</h1>
                <div className="MenuPrincipal">
                    <div className="row">
                        <div className="col">
                            <center><img src={home.thumbnail} alt="thumbnail" width="400px" height="300px"/></center>
                        </div>
                        <div className="col">
                            <h1 className="titulo">{home.name}</h1>
                            <p className="titulo">{agency.name}</p>
                            <h3 className="titulo">$ {home.totalAmount}</h3>
                            <br/>
                            <p>{home.description}</p>
                            <p>{home.location.address}</p>
                            <p>{home.city}</p>   
                            <h5><b>Rating:</b> {home.rating}</h5>                       
                        </div>
                    </div>
                    <div className="row"> 
                        <div className="col">
                        </div>
                        <div className="col">
                            <button type="submit" onClick={this.onClick} className="btn btn2">Confirmar Reservar</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }else{
        return(<Page404/>)
    }
  }
}

export default Booking;