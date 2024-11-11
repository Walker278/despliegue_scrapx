import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ModalConfiguracion from './ModalConfiguracion'; // Asegúrate de que la ruta sea correcta
import '../assets/css/modalNuevo.css';

export default function ModalNuevo({ open, onClose }) {
  
  const buttonAutomatico = () => {
    console.log("Botón Automático presionado");
    // Aquí puedes agregar la funcionalidad del botón automático
  };

  const [openModalConfiguracion, setOpenModalConfiguracion] = useState(false); // Estado para controlar la visibilidad del modal

  const handleOpenModal = () => {
    setOpenModalConfiguracion(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setOpenModalConfiguracion(false); // Cierra el modal
  };

  const buttonConfiguracion = () => {
    handleOpenModal(); // Llama a la función para abrir el modal
  };

  return (
    <Modal
      aria-labelledby="modal-nuevo-title"
      aria-describedby="modal-nuevo-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box className="modal-nuevo-style">
          <div className="modal-header">
            <Typography id="modal-nuevo-title" variant="h6" component="h2" className="modal-nuevo-title">
              Elija una opción:
            </Typography>
            <IconButton className="close-button" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <br />

          <div className="seleccion-opciones">
            <button name="buttonAutomatico" onClick={buttonAutomatico} className="button-automatico">
              Automático
            </button>
            <button name="buttonConfiguracion" onClick={buttonConfiguracion} className="button-configuracion">
              Elegir configuración
            </button>
          </div> 

          {/* Renderiza ModalConfiguracion cuando openModalConfiguracion es true */}
          {openModalConfiguracion && (
            <ModalConfiguracion open={openModalConfiguracion} onClose={handleCloseModal} />
          )}
          
          <br/>
        </Box>
      </Fade>
    </Modal>
  );
}
