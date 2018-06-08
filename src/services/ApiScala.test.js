
import ApiScala from 'services/ApiScala'

describe('ApiScala test ', () =>{

  let datos = JSON.stringify({
    checkIn: "31-05-2018",
    checkOut: "21-06-2018",
    city: "CO-MDE",
    type: "1"
  });
  
  it('obtener hogares', async () => {
    const data = ApiScala.getHomes(datos);
    expect(data).toBeDefined();
  });

});

