import React, { Component } from 'react';
import './Booking.css';
import Page404 from 'components/Page404';
import LoginNeed from 'components/LoginNeed'
import {Link} from 'react-router-dom';
import ApiPython from 'services/ApiPython';
import ApiNode from 'services/ApiNode';
import ApiScala from 'services/ApiScala';
import swal from 'sweetalert';
import {Redirect} from 'react-router-dom';

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
        this.setState({loading:true})
        let home = this.state.params.home;
        let checkIn = this.state.params.checkIn;
        let checkOut = this.state.params.checkOut;
        let agency = this.state.params.agency;
        let token = localStorage.getItem(appTokenKey)
        let reserva = {
            checkIn,
            checkOut,
            id: home.id
        }

        if(agency.name === "PawPatrol"){
            ApiPython.setBooking(reserva,token)
            .then(data => {
                this.setState({loading:false})
                if(typeof data !== 'undefined'){
                    this.showMessage(data);
                }
            })
        }

        if(agency.name === "Arriendamientos Jansel"){
            ApiNode.setBooking(reserva,token)
            .then(data => {
                this.setState({loading:false})
                if(typeof data !== 'undefined'){
                    this.showMessage(data);
                    console.log(data);
                }
            })
        }

        if(agency.name === "Arrendamientos SCAD"){
            ApiScala.setBooking(reserva,token)
            .then(data => {
                this.setState({loading:false})
                if(typeof data !== 'undefined'){
                    this.showMessage(data);
                }
            })
        }
        
    }

    showMessage(data){
        let agency = this.state.params.agency;
        let codigo = data.codigo.toString();
        let mensaje = data.mensaje || data.message
        if(codigo === "1"){
            swal( mensaje,"","success").then(()=>{
                if(agency.name === "PawPatrol"){
                    window.sessionStorage.removeItem('myBookingPython')
                  }
      
                  if(agency.name === "Arriendamientos Jansel"){
                    window.sessionStorage.removeItem('myBookingNode')
                  }
      
                  if(agency.name === "Arrendamientos SCAD"){
                    window.sessionStorage.removeItem('myBookingScala')
                  }
                this.setState({success:true})
            });
        }else{
            swal( mensaje,"","error");    
        }
    }

  render() {
    let params = this.state.params

    if (this.state.success === true) {
        return <Redirect to='/MyBooking'/>
    }
    
    if(typeof params !== 'undefined' && typeof params.home !== 'undefined' && typeof params.agency !== 'undefined'){
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
                                <button type="submit" onClick={this.onClick} className="btn btn2">
                                <img src={require('images/loading.svg')} className={this.state.loading ? 'loadingShowOpacity' : 'loadingHiddenOpacity'} height="32" width="32" alt="loading" />
                                <p>Confirmar Reservar</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return(<LoginNeed/>) 
        }
    }else{
        return(<Page404/>)
    }
  }
}

export default Booking;