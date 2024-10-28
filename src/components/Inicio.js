import React from 'react';
import Tarjeta from './Tarjeta';

function Inicio({ historial, setHistorial }) {
  const recientes = historial.slice(-4).reverse(); // Últimas 4 tarjetas del historial

  const nuevoEscaneo = () => {
    // Simulación de un nuevo escaneo
    const nuevaTarjeta = {
      id: historial.length + 1,
      usuario: 'Nuevo Usuario',
      mensaje: 'Este es un nuevo tweet',
      fecha: new Date().toLocaleString()
    };
    setHistorial([...historial, nuevaTarjeta]);
  };

  return (
    <div>
      <button onClick={nuevoEscaneo}>Nuevo</button>
      <h2>Recientes</h2>
      <div>
        {recientes.map((tarjeta) => (
          <Tarjeta key={tarjeta.id} tarjeta={tarjeta} />
        ))}
      </div>
    </div>
  );
}

export default Inicio;
