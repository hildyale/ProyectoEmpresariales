import RequestService from 'services/RequestService'

const BASE_URL = 'https://my.api.mockaroo.com';


class ApiPrueba {
    
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
        let url = `${BASE_URL}/reserva.json?key=3f52d090&__method=POST`;
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

export default new ApiPrueba()