import React from 'react';

function Tarjeta({ tarjeta }) {
  return (
    <div>
      <h3>{tarjeta.usuario}</h3>
      <p>{tarjeta.mensaje}</p>
      <small>{tarjeta.fecha}</small>
    </div>
  );
}

export default Tarjeta;
