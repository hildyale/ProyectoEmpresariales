import React, { Component } from 'react';
import './MostrarReservas.css';
import LoginNeed from 'components/LoginNeed';
import ApiPrueba from 'services/ApiPrueba';

const appTokenKey = "appToken";
const firebaseUser = "userData";

class MostrarReservas extends Component {
  constructor(){
    super()
    this.state = {
      data: null,
      show:[]
    }
  }

  componentWillMount(){
    if (typeof window.sessionStorage === 'undefined') {
      return;
    }
    let reserva = window.sessionStorage.getItem('myBooking')
    if(reserva=== null){
      let token = window.sessionStorage.getItem(appTokenKey);
      ApiPrueba.getBooking(token)   
      .then(data => {
          if(typeof data !== 'undefined'){
            window.sessionStorage.setItem('myBooking', JSON.stringify(data));   
            this.setState({data})           
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
    /*
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
    })*/

    for(let x in homes){
      let booking;
      if(idhome === homes[x].id){
        booking = homes[x].booking;
        for(let i in booking){
          if(booking[i].bookingId === idbooking){
            booking.splice(i,1);
            console.log(booking);
            data.homes = homes;
            this.setState({data})
          }
        }
      }
    }
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
          <div className="mostrarReservas">
          <h4 className="titulo">Mis Reservas</h4>
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
        return(<center><img src={require('images/loading2.svg')} alt="loading" /></center>)
      }
    }else{
      return(<LoginNeed/>) 
    }
  }
}

export default MostrarReservas;
