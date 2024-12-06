import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import '../assets/css/modalAnalisis.css';

export default function ModalAnalisis({ open, onClose, noticia, autor, fecha, titulo, palabras }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-analisis-title" aria-describedby="modal-analisis-description">
      <Box className="modal-analisis">
        {/* Header del modal */}
        <div className="modal-header">
          <Typography variant="h5" id="modal-analisis-title">Análisis</Typography>
          <IconButton onClick={onClose} className="close-button">
            <CloseIcon />
          </IconButton>
        </div>

        {/* Contenido del modal */}
        <div className="modal-content">
          {/* Noticia */}
          <Typography variant="body2"><strong>Título:</strong> {titulo || "No especificado"}</Typography>
          <Typography variant="body1" className="section-title">Noticia Analizada:</Typography>
          <Typography variant="body2" className="noticia-text">
            {noticia || "No hay información de la noticia."}
          </Typography>

          {/* Estadísticas */}
          <Typography variant="subtitle1" className="section-title">Estadísticas:</Typography>
          <div className="statistics">
            {/* Información general */}
            <div className="info-section">
              <Typography variant="body2"><strong>Autor:</strong> {autor || "Desconocido"}</Typography>
              <Typography variant="body2"><strong>Fecha:</strong> {fecha || "Desconocido"}</Typography>
              {/* <Typography variant="body2"><strong>Título:</strong> {titulo || "No especificada"}</Typography> */}
            </div>

            {/* Palabras detectadas */}
            <div className="words-section">
              <Typography variant="body2"><strong>Palabras relacionadas con acoso:</strong></Typography>
              {palabras && palabras.length > 0 ? (
                <Typography variant="body2">
                  {palabras.join(", ")}
                </Typography>
              ) : (
                <Typography variant="body2">No se detectaron palabras.</Typography>
              )}
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
