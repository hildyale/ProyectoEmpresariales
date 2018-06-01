import React, { Component } from 'react';
import './MyBooking.css';
import Page404 from 'components/Page404';
import {Link} from 'react-router-dom';
import ApiPrueba from '../../services/ApiPrueba';
import swal from 'sweetalert';
import MostrarReservas from 'components/MostrarReservas';

const appTokenKey = "appToken";
const firebaseUser = "userData";

class MyBooking extends Component {

    constructor(props){
        super(props);
        let state = undefined
        if (typeof props.location !== 'undefined') {
            state = props.location.state
        }
        this.state = {
            params: state,
            show: false,
            homes: [],
            agency: [],
            toBooking:false
        }
        this.onClick = this.onClick.bind(this);
        this.child = React.createRef();
        
        /*let date = new Date();
        let day = date.toISOString().substr(0,10)
        date.setDate(date.getDate() + 1);
        let day2 = date.toISOString().substr(0,10)
    
        this.state = {
          llegada :"",
          salida : "",
          ciudad : "CO-MDE",
          apartamento: true,
          casa: false,
          luxury: false,
          disabled : "disabled",
          minSalida: day2,
          minLlegada: day,
          resultado: false,
          data: "",
          data1: "",
          data2: "",
          show: false,
          loading: false,
          result: "",
          checkIn: "",
          checkOut: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.comprobarDatos = this.comprobarDatos.bind(this);
        this.llamadoApis = this.llamadoApis.bind(this);
        this.child = React.createRef();
        this.child1 = React.createRef();
        this.child2 = React.createRef();*/
    }

    onClick(){
        this.setState({loading:true})
        let token = localStorage.getItem(appTokenKey)
        ApiPrueba.getBooking(token)   
        .then(data => {
            if(typeof data !== 'undefined'){
                this.setState({
                  data
                });
              }
              console.log(data);              
              this.child.current.updateData();
              console.log(this.state);
              console.log(this.homes);
              console.log(data);
        })   
    } 

    asdData(){
        this.setState({
            homes: this.props.data.homes,
            agency: this.props.data.agency,
            checkIn: this.props.checkIn,
            checkOut: this.props.checkOut,
            show: true
          })
    }

    render(){
        let params = this.state.params
        let homes = this.state.homes;
        let agency = this.state.agency;
        let checkIn = this.state.checkIn;
        let checkOut = this.state.checkOut;

        if(localStorage.getItem(firebaseUser)){  

        }else{
            return(<h1>Debes estar logeado para poder hacer la Reserva</h1>) 
        }        
        return(
            <div>                
                <button type="submit" className="btn" onClick={() => this.onClick()}>Reservar</button>        
                <MostrarReservas data={this.state.data} checkIn={this.state.checkIn} checkOut={this.state.checkOut} ref={this.child}/>           
            </div>     
            );    
        
        }
}
export default MyBooking;