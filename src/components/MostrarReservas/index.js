import React, { Component } from 'react';
import './MostrarReservas.css';
import ApiNode from 'services/ApiNode';
import ApiPython from 'services/ApiPython';
import ApiScala from 'services/ApiScala';
import swal from 'sweetalert';

const appTokenKey = "appToken";

class MostrarReservas extends Component {
  constructor(props){
    super()
    this.state = {
      showComponent: true,
      data: null,
      show:[]
    }
  }

  updateData(){
    this.setState({
      data: this.props.data,
      showComponent: true
    })
   
  }

  removeItem(idbooking,idhome){
    let homes = this.props.data.homes;
    let data = this.props.data;
    for(let x in homes){
      let booking;
      if(idhome === homes[x].id){
        booking = homes[x].booking || homes[x].bookings;
        for(let i in booking){
          if(booking[i].bookingId === idbooking){
            booking.splice(i,1);
            data.homes = homes;
            this.setState({data})
            let agency = this.props.data.agency;
            data = JSON.stringify(data);
            if(agency.name === "PawPatrol"){
              window.sessionStorage.setItem('myBookingPython',data)
            }

            if(agency.name === "Arriendamientos Jansel"){
              window.sessionStorage.setItem('myBookingNode',data)
            }

            if(agency.name === "Arrendamientos SCAD"){
              window.sessionStorage.setItem('myBookingScala',data)
            }
          }
        }
      }
    }
  }

  showMessage(data,idbooking,idhome){
    let codigo = data.codigo.toString();
    let mensaje = data.mensaje || data.message
    if(codigo === "1"){
        swal( mensaje,"","success").then(()=>{
          this.removeItem(idbooking,idhome);
        });
    }else{
        swal( mensaje,"","error");    
    }
}

  removeBooking(idbooking,idhome){
    let agency = this.props.data.agency;
    let token = localStorage.getItem(appTokenKey)

    if(agency.name === "PawPatrol"){
      ApiPython.deleteBooking(idbooking,token).then(data => {
        if(typeof data !== 'undefined'){
          this.showMessage(data,idbooking,idhome);
        }
      })
    }

    if(agency.name === "Arriendamientos Jansel"){
      ApiNode.deleteBooking(idbooking,token).then(data => {
        if(typeof data !== 'undefined'){
          this.showMessage(data,idbooking,idhome);
        }
      })
    }

    if(agency.name === "Arrendamientos SCAD"){
      ApiScala.deleteBooking(idbooking,token).then(data => {
        if(typeof data !== 'undefined'){
          this.showMessage(data,idbooking,idhome);
        }
      })
    }

  }

  showBooking(key){
    let showArray = this.state.show;
    let show = showArray[key]
    show = !show;
    showArray[key] = show;
    this.setState({
      show:showArray
    })
  }

  render() {
    if(this.state.showComponent === false){
      return(<h4>Nada</h4>)
    }
    let data = this.props.data;
    let homes = null;
    let agency = null;
    if(data!==null){
      homes = this.props.data.homes;
      agency = this.props.data.agency || this.props.data.agency[0];
    }

    if(homes!==null && homes!==undefined /*&& homes.length > 0 */){
      return (
        <div className="mostrarReservas">
        <ul>
            {
                homes.map((home, key) => {
                  let bookings = home.booking || home.bookings
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
                            <button type="submit" className="btn" onClick={() => this.showBooking(key)}>{this.state.show[key] ? 'Ocultar Reservas' : 'Ver Reservas'}</button>                             
                            </div>
                        </div>
                    </div>
                    
                    <table className={this.state.show[key] ? 'table table-sm reservas' : 'hidden'} >
                      <thead>
                    <tr>
                      <th scope="col">Código </th>
                      <th scope="col">Check In</th>
                      <th scope="col">Check Out</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                  {bookings.map((booking, key) => {
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
      return(<center><img src={require('images/loading2.svg')} alt="loading" /></center>)
    }
  }
}

export default MostrarReservas;
