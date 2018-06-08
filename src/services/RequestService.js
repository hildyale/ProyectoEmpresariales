const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
class RequestService {

    // async function
    async getRequest(url,options){
      let data = await (await (fetch(proxyUrl + url,options)
        .then(res => {
          if(res.ok){
            return res.json()
          }else{
            console.log('Status code:'+res.status+' Status: '+res.statusText) 
            /* 
            res = res.json();
            console.log(res)  
            */        
          }
        })
        .catch(err => {
          console.log('Error: ', err)
          //return err;
        })
      ))
      return data
    }
}
    
export default new RequestService()

/*
if(res.ok){
  return res.json()
}else{
  console.log('Status code:'+res.status+' Status: '+res.statusText)  
  res = res.json();
  console.log(res)          
}
*/