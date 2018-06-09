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
        this.timer = null;
        let state = undefined
        if (typeof props.location !== 'undefined') {
            state = props.location.state
        }
        this.state = {
            params: state,
            result: null
        }
        this.onClick = this.onClick.bind(this);
        this.verificarRespuesta = this.verificarRespuesta.bind(this);
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
                                    <p className="titulo"><b>{agency.name}</b></p>
                                    <h3 className="titulo">$ {home.totalAmount}</h3>
                                    <br/>
                                    <p><b>{home.description}</b></p>
                                    <p><b>{home.location.address}</b></p>
                                    <p><b>{home.city}</b></p>   
                                    <h5><b>Rating: {home.rating}</b></h5>                       
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

    onClick(){
        this.timer = setTimeout(this.verificarRespuesta,15000);
        this.setState({
            loading:true,
            result: 1
        })
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
        this.setState({
            result: 2
        })
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
                window.sessionStorage.removeItem('state')
                this.setState({success:true})
            });
        }else{
            swal( mensaje,"","error");    
        }
    }

    verificarRespuesta(){
        let result = this.state.result;
        let data = {
            codigo: 0,
            mensaje: "El servidor no responde, intente mas tarde"
        }
        if (result === 1){
            this.showMessage(data);
        }
    }

    componentWillUnmount(){
        clearTimeout(this.timer);
    }


}

export default Booking;