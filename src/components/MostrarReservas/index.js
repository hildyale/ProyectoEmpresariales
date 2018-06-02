import React, { Component } from 'react';
import './MostrarReservas.css';
import {Link,Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import Page404 from 'components/Page404';
import ApiPrueba from 'services/ApiPrueba';

const appTokenKey = "appToken";
const firebaseUser = "userData";

class MostrarReservas extends Component {
  constructor(){
    super()
    this.state = {
      data: null,
      show:false,
      isShown: "Ver Reservas"
    }
  }

  componentWillMount(){
    if (typeof window.localStorage == 'undefined') {
      return;
    }
    let reserva = window.localStorage.getItem('myBooking')
    if(reserva=== null){
      let token = window.localStorage.getItem(appTokenKey);
      ApiPrueba.getBooking(token)   
      .then(data => {
          if(typeof data !== 'undefined'){
              localStorage.setItem('myBooking', JSON.stringify(data));              
          } 
        }) 
    }else{
      reserva = JSON.parse(reserva);
      this.setState({data:reserva})
    }  
  }

  removeBooking(idbooking,idhome){
    let homes = this.state.data.homes;
    let data = this.state.data;
    console.log(idbooking);
    console.log(idhome);
    homes.map((home, key) => {
      let booking;
      if(idhome === home.id){
        booking = home.booking;
        for(let i in booking){
          if(booking[i].bookingId === idbooking){
            booking.splice(i,1);
            console.log(booking);
            data.homes = homes;
            this.setState({data})
          }
        }
      }
    })
    /*let token = localStorage.getItem(appTokenKey)
    
    ApiPrueba.deleteBooking(id,token).then(data => {
      if(typeof data !== 'undefined'){
        let codigo = data.codigo.toString();
        let mensaje = data.mensaje
        if(codigo === "1"){
            swal( mensaje,"","success");
        }else{
            swal( mensaje,"","error");    
        }
    }
    })*/ 

  }

  showBooking(show){
    show = !show;
    let isShown;
    if(show){
      isShown = "Ocultar Reservas"
    }
    else{
      isShown = "Ver Reservas"
    }
    this.setState({
      show,
      isShown      
    })
  }

  render() {
    let Login = false;
    if (typeof window.localStorage !== 'undefined') {
       Login = window.localStorage.getItem(firebaseUser);
    }
    let data = this.state.data;
    let homes = null;
    let agency = null;
    if(data!==null){
      homes = this.state.data.homes;
      agency = this.state.data.agency;
    }
    if(Login){
      if(homes!==null && homes.length > 0 ){
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
                              <button type="submit" className="btn" onClick={() => this.showBooking(this.state.show)}>{this.state.isShown}</button>                             
                              </div>
                          </div>
                      </div>
                      
                      <table className={this.state.show ? 'table table-sm reservas' : 'hidden'} >
                        <thead>
                      <tr>
                        <th scope="col">Código </th>
                        <th scope="col">Check In</th>
                        <th scope="col">Check Out</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                    {home.booking.map((booking, key) => {
                    return(
                      <tr key={key}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.checkIn}</td>
                        <td>{booking.checkOut}</td>
                        <td><button className="btn" onClick={() => this.removeBooking(booking.bookingId,home.id)}><i className="fa" > &#xf00d; </i></button>
                        </td></tr>
                    )})
                    }
                   </tbody>
                    </table>
                      </li>
                  )})
                }
          </ul>
          </div>
        );
      }
      else{
        return(<Page404/>)
      }
    }else{
      return(<h1>Debes estar logeado para poder hacer la Reserva</h1>) 
    }
  }
}

export default MostrarReservas;
