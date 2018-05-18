import React, { Component } from 'react';
import './MostrarHogares.css';
import {Link} from 'react-router-dom';

class MostrarHogares extends Component {
  constructor(){
    super()
    this.state = {
      show: false,
      homes: [],
      agency: []
    }
  }

  updateData(){
    this.setState({
      homes: this.props.data.homes,
      agency: this.props.data.agency,
      checkIn: this.props.checkIn,
      checkOut: this.props.checkOut,
      show: true
    })
  }

  deleteData(){
    this.setState({
      homes: [],
      agency: [],
      show: false
    })
  }

  render() {
    let homes = this.state.homes;
    let agency = this.state.agency;
    let checkIn = this.state.checkIn;
    let checkOut = this.state.checkOut;
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
                           <h5>{agency.name}</h5>
                          </div>
                          <div className="col-sm">
                          <h5><b>Rating:</b> {home.rating}</h5>
                          </div>
                          <div className="col">
                           
                           <Link to={{ pathname: '/Booking', state: { agency,home,checkIn,checkOut} }}><button type="submit" className="btn">Reservar</button></Link>
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

export default MostrarHogares;
