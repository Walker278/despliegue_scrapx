import React, { useState } from 'react';
import Inicio from './components/Inicio';
import Historial from './components/Historial';
import Carrusel from './components/Carrusel';
import logo_scrapx from './assets/images/logo_scrapx.svg';
import menu_icon from './assets/images/menu.png';
import "./App.css"; 

function App() {
  const [historial, setHistorial] = useState([]); // Estado para las tarjetas del historial
  const [view, setView] = useState('inicio'); // Estado para la vista actual

  return (
    <frameElement>
      <section className='Nombre_scrapx'>
        <div>
          <img src={logo_scrapx} className="App-logo_scrapx" alt="logo_scrapx" />
          <h1>ScrapX</h1>
          <img src={menu_icon} className="App-menu_icon" alt="menu_icon" />
        </div>
      </section>
      
      <div>
        <nav className="nav-container">
          <button
            className={`nav-button ${view === 'inicio' ? 'active' : ''}`}
            onClick={() => setView('inicio')}
          >
            <span className="icon">🏠</span> Inicio
          </button>
          <button
            className={`nav-button ${view === 'historial' ? 'active' : ''}`}
            onClick={() => setView('historial')}
          >
            <span className="icon">📋</span> Historial
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
    </frameElement>
  );
}

export default App;
