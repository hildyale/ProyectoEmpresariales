import RequestService from 'services/RequestService'

const BASE_URL = 'https://pawpatrolhouses.herokuapp.com/v1/homes';


class ApiPython {
    
    getHomes(datos){
        datos = JSON.stringify(datos);
        let options =  {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: datos
          }
        let url = `${BASE_URL}/search`;
        return RequestService.getRequest(url,options);
      }

    setBooking(datos,token){
      datos = JSON.stringify(datos);
      let options =  {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
          },
          body: datos
        }
      let url = `${BASE_URL}/booking`;
      return RequestService.getRequest(url,options);
    }

    getBooking(token){
      let options =  {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
          }
        }
      let url = `${BASE_URL}/myBooking`;
      return RequestService.getRequest(url,options);
    }

    deleteBooking(bookingId,token){
      let datos = {bookingId}
      datos = JSON.stringify(datos);
      let options =  {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': token
          },
          body : datos
        }
      let url = `${BASE_URL}/removeBooking`;
      return RequestService.getRequest(url,options);
    }

}

export default new ApiPython()