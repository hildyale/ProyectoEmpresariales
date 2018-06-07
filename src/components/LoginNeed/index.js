import React from 'react';

const style = {
  fontFamily: 'HelveticaNeue-Roman'
}


const LoginNeed = (props) => {
  return (
    <div style={style}>
      <h1>Sin permisos</h1>
      <div className="MenuPrincipal">
      <h2>Debes estar logeado para poder ver esta pagina</h2>
      </div>
    </div>
  );
};


export default LoginNeed