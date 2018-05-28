import RequestService from './RequestService'

const BASE_URL = 'https://scad-app-empresariales.herokuapp.com/v1/homes';


class ApiScala {
    
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

export default new ApiScala()