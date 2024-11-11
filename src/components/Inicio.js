import React, { useState } from 'react';
import Tarjeta from './Tarjeta';
import ModalNuevo from './ModalNuevo'; // Asegúrate de que la ruta sea correcta
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "../assets/css/inicio.css";

function Inicio({ historial, setHistorial }) {
  const [openModalNuevo, setOpenModalNuevo] = useState(false); // Estado para controlar la visibilidad del modal
  const recientes = historial.slice(-4).reverse(); // Últimas 4 tarjetas del historial

  const handleOpenModal = () => {
    setOpenModalNuevo(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setOpenModalNuevo(false); // Cierra el modal
  };

  const nuevoEscaneo = () => {
    handleOpenModal(); // Llama a la función para abrir el modal
  };

  return (
    <div>
      <button name="nuevoEscaneo" onClick={nuevoEscaneo} className="boton-nuevo">
        Nuevo
        <AddCircleOutlineIcon style={{ marginLeft: '8px' }} /> {/* Espaciado a la izquierda del ícono */}
      </button>
      <h2>Recientes</h2>
      <div>
        {recientes.map((tarjeta) => (
          <Tarjeta key={tarjeta.id} tarjeta={tarjeta} />
        ))}
      </div>

      {/* Renderiza el ModalNuevo cuando openModalNuevo es true */}
      <ModalNuevo open={openModalNuevo} onClose={handleCloseModal} />
    </div>
  );
}

export default Inicio;
