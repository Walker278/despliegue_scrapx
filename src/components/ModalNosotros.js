import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo_scrapx from '../assets/images/logo_scrapx.svg';
import '../assets/css/modalNosotros.css';

export default function ModalNuevo({ open, onClose }) {
  const buttonInstagram = () => {
    window.open('https://www.instagram.com/moises_andres278', '_blank');
  };

  const buttonFacebook = () => {
    window.open('https://www.facebook.com/moises.andres.902604', '_blank');
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
        <Box className="modal-nosotros-style">
          <div className="close-button-wrapper">
            <IconButton className="close-button" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <div className="modal-content">
            <img src={logo_scrapx} className="App-logo_scrapx1" alt="logo_scrapx" />
            <Typography id="modal-nuevo-title" variant="h6" component="h2" className="modal-title">
              Sobre nosotros:
            </Typography>
            <br/>
            <p className="modal-description">
              Scrapx es una plataforma...
            </p>
          </div>
          <div className="social-buttons">
            <IconButton onClick={buttonInstagram} className="button-instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton onClick={buttonFacebook} className="button-facebook">
              <FacebookIcon />
            </IconButton>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
