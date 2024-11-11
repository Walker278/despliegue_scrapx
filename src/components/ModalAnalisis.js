import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../assets/css/modalAnalisis.css';

export default function ModalAnalisis({ open, onClose, noticia, autor, categoria, palabras }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-analisis">
        <div className="modal-header">
          <Typography variant="h5">Análisis</Typography>
          <IconButton onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal-content">
          <Typography variant="body1" className="section-title">Aquí va el twitt...</Typography>
          <Typography variant="body2" className="noticia-text">{noticia}</Typography>

          <Typography variant="subtitle1" className="section-title">Estadísticas:</Typography>
          <div className="statistics">
            <div className="info-section">
              <Typography variant="body2"><strong>Autor:</strong> {autor}</Typography>
              <Typography variant="body2"><strong>Categoría:</strong> {categoria}</Typography>
            </div>
            <div className="words-section">
              <Typography variant="body2"><strong>Palabras detectadas:</strong></Typography>
              <ul>
                {palabras.map((palabra, index) => (
                  <li key={index}>{palabra}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
