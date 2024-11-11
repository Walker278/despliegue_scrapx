import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../assets/css/modalEstadisticas.css';

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className="modal-style">
            <Typography id="transition-modal-title" variant="h6" component="h2" className="modal-title">
              Análisis
            </Typography>
            <Box className="modal-content">
              <Box className="news-box">
                <Typography>Aquí va la noticia...</Typography>
              </Box>
              <Typography variant="body1" className="stats-title">Estadísticas:</Typography>
              <Box className="stats-box">
                <Typography>Nombre del sitio web:</Typography>
                <Typography>Palabras detectadas:</Typography>
                <Typography>Fecha:</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
