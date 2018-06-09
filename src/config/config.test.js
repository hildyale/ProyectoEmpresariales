import {firebaseAuth, googleProvider} from "config/constants";

describe('Constants test ', () =>{

  it('constants', () => {
    firebaseAuth().signInWithRedirect(googleProvider);
  });

});