const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
class RequestService {

    // async function
    async getRequest(url,options){
      let data = await (await (fetch(proxyUrl + url,options)
        .then(res => {
          return res.json()
        })
        .catch(err => {
          //console.log('Error: ', err)
          return err;
        })
      ))
      return data
    }
}
    
export default new RequestService()