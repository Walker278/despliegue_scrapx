import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import '../assets/css/modalConfiguracion.css';

const categorias = ['Espectáculos', 'Deportes', 'Política'];
const tiposAcoso = ['Verbal', 'Físico', 'Cibernético'];

export default function ModalConfiguracion({ open, onClose }) {
  const [categoria, setCategoria] = useState(categorias[0]);
  const [inputCategoria, setInputCategoria] = useState('');
  const [tipoAcoso, setTipoAcoso] = useState(tiposAcoso[0]);
  const [inputTipoAcoso, setInputTipoAcoso] = useState('');

  const buttonEscanear = () => {
    console.log("Botón Automático presionado");
    // Aquí puedes agregar la funcionalidad del botón automático
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      aria-labelledby="modal-configuracion-title"
      aria-describedby="modal-configuracion-description"
    >
      <Fade in={open}>
        <Box className="modal-configuracion-style">
          <div className="modal-header1">
            <Typography variant="h6" component="h2">
              Elija la configuración:
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <br/>

          <div className="select-container">
            <Autocomplete
              value={categoria}
              onChange={(event, newValue) => setCategoria(newValue)}
              inputValue={inputCategoria}
              onInputChange={(event, newInputValue) => setInputCategoria(newInputValue)}
              options={categorias}
              renderInput={(params) => <TextField {...params} label="Categoría" variant="outlined" />}
              style={{ width: 300, marginBottom: '1rem' }}
            />

            <Autocomplete
              value={tipoAcoso}
              onChange={(event, newValue) => setTipoAcoso(newValue)}
              inputValue={inputTipoAcoso}
              onInputChange={(event, newInputValue) => setInputTipoAcoso(newInputValue)}
              options={tiposAcoso}
              renderInput={(params) => <TextField {...params} label="Tipo de acoso" variant="outlined" />}
              style={{ width: 300 }}
            />
          </div>
          
          <br/>
          
          <button name="buttonEscanear" onClick={buttonEscanear} className="button-escanear">
            Escanear
            <LibraryBooksIcon style={{ marginLeft: '8px' }} /> {/* Espaciado a la izquierda del ícono */}
          </button>

        </Box>
      </Fade>
    </Modal>
  );
}
