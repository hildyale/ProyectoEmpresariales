import RequestService from 'Services/RequestService'

const BASE_URL = 'https://backend-arrendamiento-jansel.herokuapp.com/v1/homes';


class ApiNode {
    
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

export default new ApiNode()