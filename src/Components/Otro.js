import React, { Component } from 'react';
import './Otro.css';
import responseJson from '.././utils/response.json'

class Otro extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      homes: [],
      agency: []
    }
  }

  componentWillMount() {
    fetch('http://www.mocky.io/v2/5ad2dfe12d00005b005c972e') //https://www.mocky.io/
      .then(response => response.json())
      .then(data => this.setState({data,homes: data.homes,agency: data.agency}))
      .catch((error) => {
        this.setState({data: responseJson,homes: responseJson.homes,agency: responseJson.agency})
        console.log(error)
      });
  }


  render() {
    console.log(this.state.data)
    const homes = this.state.homes;
    const agency = this.state.agency;
    return (
      <div className="otro">
       <h1>Otro</h1>
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
  }
}

export default Otro;
