import React from 'react';
import Tarjeta from './Tarjeta';

function Historial({ historial }) {
  return (
    <div>
      <h2>Historial</h2>
      {historial.length === 0 ? (
        <p>No hay historial aún.</p>
      ) : (
        historial.map((tarjeta) => <Tarjeta key={tarjeta.id} tarjeta={tarjeta} />)
      )}
    </div>
  );
}

export default Historial;
