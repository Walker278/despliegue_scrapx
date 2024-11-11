import React, { useState } from 'react';
import Inicio from './components/Inicio';
import Historial from './components/Historial';
import Carrusel from './components/Carrusel';
import logo_scrapx from './assets/images/logo_scrapx.svg';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
// import ModalNosotros from './ModalNosotros'; // Asegúrate de que la ruta sea correcta
import ModalNosotros from './components/ModalNosotros';
import "./App.css"; 

function App() {
  const [historial, setHistorial] = useState([]); // Estado para las tarjetas del historial
  const [view, setView] = useState('inicio'); // Estado para la vista actual

  const [openModalNosotros, setOpenModalNosotros] = useState(false); // Estado para controlar la visibilidad del modal

  const handleOpenModal = () => {
    setOpenModalNosotros(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setOpenModalNosotros(false); // Cierra el modal
  };

  const buttonMenu = () => {
    handleOpenModal(); // Llama a la función para abrir el modal
  };

  return (
    <div>
      <section className='Nombre_scrapx'>
        <div>
          <img src={logo_scrapx} className="App-logo_scrapx" alt="logo_scrapx" />
          <h1>ScrapX</h1>
          <IconButton onClick={buttonMenu} className="button-menu">
            <MenuIcon />
          </IconButton>
        </div>
      </section>
      
      <hr/>

      <div>
        <nav className="nav-container">
          <button
            className={`nav-button ${view === 'inicio' ? 'active' : ''}`}
            onClick={() => setView('inicio')}
          >
            <HomeIcon style={{ marginRight: '8px', fontSize: "24px" }} />
            Inicio
          </button>
          <button
            className={`nav-button ${view === 'historial' ? 'active' : ''}`}
            onClick={() => setView('historial')}
          >
            <DescriptionIcon style={{ marginRight: '8px', fontSize: "24px" }} />
            Historial
          </button>
        </nav>

        <Carrusel />
        <main>
          {view === 'inicio' ? (
            <Inicio historial={historial} setHistorial={setHistorial} />
          ) : (
            <Historial historial={historial} />
          )}
        </main>
      </div>

      {/* Renderiza ModalNosotros cuando openModalNosotros es true */}
      {openModalNosotros && (
        <ModalNosotros open={openModalNosotros} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
