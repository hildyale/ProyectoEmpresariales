import RequestService from 'services/RequestService'

const BASE_URL = 'https://pawpatrolhouses.herokuapp.com/v1/homes';


class ApiPython {
    
    getHomes(datos){
        let options =  {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: datos
          }
        let url = `${BASE_URL}/search`;
        return RequestService.getRequest(url,options);
      }

}

export default new ApiPython()