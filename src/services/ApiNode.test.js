import ApiNode from 'services/ApiNode'

describe('ApiNode test ', () =>{

  let datos = JSON.stringify({
    checkIn: "31-05-2018",
    checkOut: "21-06-2018",
    city: "CO-MDE",
    type: "1"
  });

  let datosMalos = JSON.stringify({
    checkIn: "31-05-2018",
    checkOut: "21-06-2018",
    city: "MDE",
    type: "1"
  });
  
  it('obtener hogares', async () => {
    const data = await ApiNode.getHomes(datos);
    expect(data).toBeUndefined();
  });

  it('obtener hogares error', async () => {
    const data = await ApiNode.getHomes(datos);
    expect(data).toBeUndefined();
  });

});