import React, { Component } from 'react';
import './MostrarReservas.css';
import ApiNode from 'services/ApiNode';
import ApiPython from 'services/ApiPython';
import ApiScala from 'services/ApiScala';
import ApiSpring from 'services/ApiSpring';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom';

const appTokenKey = "appToken";

class MostrarReservas extends Component {
  constructor(props){
    super()
    this.timer = null;
    this.state = {
      data: null,
      show:[],
      redirect: false,
      loading: [],
      onLoad: false
    }
    this.verificarRespuesta = this.verificarRespuesta.bind(this);
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/MyBooking' />
    }

    if(this.props.data === "node" || this.props.data=== "scala" || this.props.data === "python" || this.props.data === "spring"){
      return(<center><div>Ha ocurrido un error con el servidor de {this.props.data}, intentelo mas tarde</div></center>)
    }

    let data = this.props.data;
    let homes = null;
    let agency = null;
    if(data!==null){
      homes = this.props.data.homes;
      agency = this.props.data.agency;
    }
    if(data !== null){
      if(homes!==null && homes!==undefined /*&& homes.length > 0 */){
        return (
          <div className="mostrarReservas">
          <ul>
              {
                  homes.map((home, keyHome) => {
                    let bookings = home.booking || home.bookings
                    return(
                      <li key={keyHome}>
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
                              <button type="submit" className="btn" onClick={() => this.showBooking(keyHome)}>{this.state.show[keyHome] ? 'Ocultar Reservas' : 'Ver Reservas'}</button>                             
                              </div>
                          </div>
                      </div>
                      
                      <table className={this.state.show[keyHome] ? 'table table-sm reservas' : 'hidden'} >
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
                    let loading = this.state.loading[keyHome];
                    let loading2;
                    if(typeof loading === 'undefined'){
                      loading2 = false;    
                    }else{
                      loading2 = loading[key];
                    }
                    
                    return(
                      <tr key={key}>
                        <td>{booking.bookingId}</td>
                        <td>{booking.checkIn}</td>
                        <td>{booking.checkOut}</td>
                        <td>
                          <button className="btn" onClick={() => this.removeBooking(booking.bookingId,home.id,keyHome,key)}>
                            <i className="fa" > &#xf00d; </i>
                          </button>
                          <img src={require('images/loading.svg')} className={loading2 ? 'loadingShowOpacity' : 'loadingHiddenOpacity'} height="32" width="32" alt="loading" />
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
      }else{
        return(<div></div>)
      }
    }
    else{
      return(<center><img src={require('images/loading2.svg')} alt="loading" /></center>)
    }
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
              //window.sessionStorage.setItem('myBookingPython',data)
              window.sessionStorage.removeItem('myBookingPython')
              this.props.updateBooking("python")
            }

            if(agency.name === "Arriendamientos Jansel"){
              window.sessionStorage.removeItem('myBookingNode')
              this.props.updateBooking("node")
            }

            if(agency.name === "Arrendamientos SCAD"){
              window.sessionStorage.removeItem('myBookingScala')
              this.props.updateBooking("scala")
            }
            if(agency.name === "Arrendamientos Santa Fé"){
              window.sessionStorage.removeItem('myBookingSpring')
              this.props.updateBooking("spring")
            }
            window.sessionStorage.removeItem('state')
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

  removeBooking(idbooking,idhome,x,y){
    let agency = this.props.data.agency;
    let token = localStorage.getItem(appTokenKey)
    this.timer = setTimeout(this.verificarRespuesta,15000);
    let loading = this.state.loading
    let loading2 = loading[x];
    if(typeof loading2 === 'undefined'){
      loading2 = []
    }
    loading2[y] = true;
    loading[x] = loading2;
    this.setState({
      loading,
      onLoad: true
    })
    if(agency.name === "PawPatrol"){
      ApiPython.deleteBooking(idbooking,token).then(data => {
        if(typeof data !== 'undefined'){
          this.showMessage(data,idbooking,idhome);
        }
        loading2[y] = false;
        loading[x] = loading2;
        this.setState({
          loading,
          onLoad: false
        })
      })
    }

    if(agency.name === "Arriendamientos Jansel"){
      ApiNode.deleteBooking(idbooking,token).then(data => {
        if(typeof data !== 'undefined'){
          this.showMessage(data,idbooking,idhome);
        }
        loading2[y] = false;
        loading[x] = loading2;
        this.setState({
          loading,
          onLoad: false
        })
      })
    }

    if(agency.name === "Arrendamientos SCAD"){
      ApiScala.deleteBooking(idbooking,token).then(data => {
        if(typeof data !== 'undefined'){
          this.showMessage(data,idbooking,idhome);
        }
        loading2[y] = false;
        loading[x] = loading2;
        this.setState({
          loading,
          onLoad: false
        })
      })
    }

    if(agency.name === "Arrendamientos Santa Fé"){
      ApiSpring.deleteBooking(idbooking,token).then(data => {
        if(typeof data !== 'undefined'){
          this.showMessage(data,idbooking,idhome);
        }
        loading2[y] = false;
        loading[x] = loading2;
        this.setState({
          loading,
          onLoad: false
        })
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

  verificarRespuesta(){
    let onLoad = this.state.onLoad;
    if (onLoad){
      swal( "servidor no responde, intentar mas tarde","","error"); 
    }
    this.setState({
      loading: []
    })
  }

  componentWillUnmount(){
    clearTimeout(this.timer);
  }

}




export default MostrarReservas;
