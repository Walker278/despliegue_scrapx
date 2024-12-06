import React, { useState, useEffect } from 'react';
import Tarjeta from './Tarjeta';
import ModalNuevo from './ModalNuevo';
import ModalAnalisis from './ModalAnalisis';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Papa from 'papaparse';
import "../assets/css/inicio.css";

function Inicio({ historial, setHistorial }) {
  const [openModalNuevo, setOpenModalNuevo] = useState(false); // Estado para controlar la visibilidad del modal
  const [openModalAnalisis, setOpenModalAnalisis] = useState(false); // Estado para controlar la visibilidad del modal
  const [selectedTarjeta, setSelectedTarjeta] = useState(null); // Tarjeta seleccionada
  const [csvData, setCsvData] = useState([]); // Estado para los datos del CSV

  // Abre el modal Nuevo
  const handleOpenModal = () => {
    setOpenModalNuevo(true);
  };

  // Cierra el modal Nuevo
  const handleCloseModal = () => {
    setOpenModalNuevo(false);
  };

  // Diccionario de palabras relacionadas con el acoso
  const diccionarioDeAcoso = [
    // General
    "acoso", "hostigamiento", "intimidación", "amenaza", "chantaje", "coacción",
    "manipulación", "persecución", "acecho", "insulto", "desprecio", "humillación", 
    "ofensa", "violencia", "abuso", "maltrato", "presión", "provocación",

    // Tipos de acoso
    "bullying", "cyberbullying", "stalking", "grooming", "mobbing", "shaming", 
    "sextorsión", "extorsión", "aislamiento", "marginación", "ostracismo", 
    "exclusión", "descalificación", "ridiculización", "abuso emocional", 
    "violencia psicológica", "violencia simbólica", "violencia económica",
    "acoso escolar", "acoso cibernético", 

    // Ciberacoso
    "spam ofensivo", "doxxing", "suplantación", "troleo", "hackeo", 
    "acoso digital", "mensaje amenazante", "comentario ofensivo", "difamación en línea",

    // Acoso sexual
    "extorsión sexual", "conducta inapropiada", "miradas lascivas", "toqueteos", 
    "proposiciones sexuales", "gestos obscenos", "comentarios sexuales", 
    "abusos sexuales", "violación", "exposición no consentida", "insinuaciones sexuales",
    "acoso sexual", 

    // Acoso laboral
    "hostigamiento laboral", "mobbing laboral", "presión indebida", "denigración", 
    "abusos de poder", "trato injusto", "despido injustificado", "exigencias abusivas",
    "acoso laboral",
    
    // Acoso escolar
    "abusos escolares", "molestar", "pegar", "golpear", "burlas", "poner apodos", 
    "agresión verbal", "agresión física", "exclusión social", 

    // Conductas y efectos asociados
    "controlar", "manipular", "amedrentar", "humillar", "denigrar", "amedrentamiento", 
    "chantaje emocional", "abusos sistemáticos", "ataques personales", "miedo", 
    "estrés", "trauma", "vulnerable", "silencio obligado", "tensión", "sometimiento",

    // Insultos y términos relacionados
    "idiota", "imbécil", "tonto", "estúpido", "inútil", "perdedor", "basura", 
    "despreciable", "repugnante", "horrible", "incapaz", "feo", "gordo", "anormal", 
    "raro", "freak", "débil", "patético", "nada", "irresponsable",

    // Otros términos
    "delito", "acusación", "criminal", "testigo", "víctima", "denuncia", "demanda", 
    "difamación", "calumnia", "juicio", "abogado", "testimonio", "prueba", "culpa", 
    "sospecha", "evidencia",

    // // Tecnologías involucradas (ciberacoso)
    // "red social", "plataforma", "app", "aplicación", "foro", "chat", "videojuego", 
    // "correo electrónico", "publicación", "comentario", "mensaje privado", "direct message",
    
    // Inglés (considerando textos multilingües)
    "harassment", "bully", "stalker", "abuser", "threat", "violence", "shame", 
    "abuse", "insult", "humiliation", "pressure", "exclusion", "ostracism", "blackmail", 
    "extortion", "cyberstalking", "troll", "inappropriate behavior", "guilt", "vulnerability"
  ];

  // Buscar palabras del diccionario en el texto de la noticia
  const detectarPalabras = (texto) => {
    const palabrasDetectadas = diccionarioDeAcoso.filter((palabra) =>
      texto.toLowerCase().includes(palabra.toLowerCase())
    );
    return palabrasDetectadas;
  };

  // Manejar el clic en una tarjeta
  const handleTarjetaClick = (tarjeta) => {
    const palabrasDetectadas = detectarPalabras(tarjeta.descripcion); // Detectar palabras
    setSelectedTarjeta({
      noticia: tarjeta.descripcion,
      autor: tarjeta.noticiero,
      fecha: tarjeta.fecha,
      titulo: tarjeta.titulo,
      palabras: palabrasDetectadas,
    });
    setOpenModalAnalisis(true); // Abre el modal de análisis
  };

  // Cierra el modal de análisis
  const handleCloseModalAnalisis = () => {
    setOpenModalAnalisis(false); 
    setSelectedTarjeta(null); 
  };

  // Carga los datos del CSV y toma solo los últimos 4 registros
  useEffect(() => {
    const csvFilePath = require('../documents/csv/noticias_121124.csv');

    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      newline: "\n",
      quoteChar: '"',
      complete: (result) => {
        // Tomamos solo los últimos 4 registros
        const lastFourRecords = result.data.slice(-4).reverse();
        setCsvData(lastFourRecords); // Asigna los últimos 4 registros al estado
      },
      error: (error) => {
        console.error('Error al cargar el archivo CSV:', error);
      },
    });
  }, []);

  return (
    <div>
      <button name="nuevoEscaneo" onClick={handleOpenModal} className="boton-nuevo">
        Nuevo
        <AddCircleOutlineIcon style={{ marginLeft: '8px' }} /> {/* Espaciado a la izquierda del ícono */}
      </button>

      <h2>Recientes</h2>
      <br/>
      <br/>
      <div className="recentTargets">
        {/* Solo muestra las últimas 4 tarjetas desde el CSV */}
        {csvData.length > 0 ? (
          csvData.map((row, index) => (
            <Tarjeta
              key={index}
              tarjeta={{
                titulo: row["Titulo"],
                noticiero: row["Noticiero"],
                descripcion: row["Descripcion"],
                fecha: row["Fecha"] || 'No disponible'
              }}
              onClick={() => handleTarjetaClick({
                titulo: row["Titulo"],
                descripcion: row["Descripcion"],
                noticiero: row["Noticiero"],
                fecha: row["Fecha"] || 'No disponible',
              })}
            />
          ))
        ) : (
          <p>Cargando datos...</p> // Si los datos aún no están disponibles
        )}
      </div>

      {/* ModalNuevo */}
      <ModalNuevo open={openModalNuevo} onClose={handleCloseModal} />

      {/* ModalAnalisis */}
      {selectedTarjeta && (
        <ModalAnalisis
          open={openModalAnalisis}
          onClose={handleCloseModalAnalisis}
          noticia={selectedTarjeta.noticia}
          autor={selectedTarjeta.autor}
          fecha={selectedTarjeta.fecha}
          titulo={selectedTarjeta.titulo}
          palabras={selectedTarjeta.palabras}
        />
      )}
      <br/>
    </div>
  );
}

export default Inicio;
