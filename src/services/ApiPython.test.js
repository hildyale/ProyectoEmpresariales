import ApiPython from 'services/ApiPython'


describe('ApiPython test ', () =>{

  let datos = JSON.stringify({
    checkIn: "31-05-2018",
    checkOut: "21-06-2018",
    city: "CO-MDE",
    type: "1"
  });
  
  it('obtener hogares', async () => {
    const data = await ApiPython.getHomes(datos);
    expect(data).toBeDefined();
  });

});