import React, { Component } from 'react';
import './Otro.css';

class Otro extends Component {
  constructor(){
    super()
    this.state = {
      show: false,
      data: [],
      homes: [],
      agency: []
    }
  }

  updateData(){
    this.setState({
      data: this.props.data,
      homes: this.props.data.homes,
      agency: this.props.data.agency,
      show: true
    })
  }

  render() {
    console.log(this.state.homes)
    let homes = this.state.homes;
    let agency = this.state.agency;
    if(this.state.show){
    return (
      <div className="otro">
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
                          <div className="col-6">
                            <h4>{home.type}</h4>
                            <h5>Precio</h5>
                            <p><b>Total:</b> {home.description}</p>
                            <p><b>Noche:</b> {home.location.address}</p>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-sm">
                           <h5>{agency.name}</h5>
                          </div>
                          <div className="col-sm">
                          <h5><b>Rating:</b> {home.rating}</h5>
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
      return(<h1>nada</h1>);
    }
  }
}

export default Otro;
