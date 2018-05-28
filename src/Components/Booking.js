import React, { Component } from 'react';
import './Booking.css';
import Page404 from './Page404';
import {Link} from 'react-router-dom';

const appTokenKey = "appToken";
const firebaseUser = "userData";

const styleBackButton = {
    fontSize: '40px',
    color: 'white'
}

class Booking extends Component {
  constructor(props){
      super()
      let state = undefined
      if (typeof props.location !== 'undefined') {
          state = props.location.state
      }
      this.state = {
        params: state
      }
      this.onClick = this.onClick.bind(this);
  }

    onClick(){
        console.log('reserva');
        let home = this.state.params.home;
        let checkIn = this.state.params.checkIn;
        let checkOut = this.state.params.checkOut;
        let token = localStorage.getItem(appTokenKey)
        let reserva = {
            checkIn,
            checkOut,
            id: home.id
        }
        console.log(reserva);
        console.log(token);
        /**************************************************************************************************************************************** */
        /**Consumiendo Api */
        /*
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://backend-arrendamiento-jansel.herokuapp.com/v1/homes/search';
        fetch(proxyUrl + targetUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            token
          },
          body: reserva
        }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
        */
    }

  render() {
    let params = this.state.params
    if(params !== undefined){
        if(localStorage.getItem(firebaseUser)){  
            let agency = params.agency;
            let home = params.home;
            //let state = localStorage.getItem('state');
            

            return (
                <div className="Booking">
                    {/*<h1><Link to={{ pathname: '/Inicio', state: {state} }}><i className="fa" style ={styleBackButton}>&#xf137;</i></Link>*/}
                    <h1><Link to='/Inicio'><i className="fa" style ={styleBackButton}>&#xf137;</i></Link>
                    &nbsp;Reserva</h1>
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
            return(<h1>Debes estar logeado para poder hacer la Reserva</h1>) 
        }
    }else{
        return(<Page404/>)
    }
  }
}

export default Booking;