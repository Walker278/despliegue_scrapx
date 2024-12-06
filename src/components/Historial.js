import React, { useState, useEffect } from "react";
import Tarjeta from "./Tarjeta";
import ModalAnalisis from "./ModalAnalisis";
import Papa from "papaparse";
import "../assets/css/historial.css";

function Historial() {
  const [csvData, setCsvData] = useState([]); // Datos del CSV
  const [modalOpen, setModalOpen] = useState(false); // Estado del modal
  const [selectedTarjeta, setSelectedTarjeta] = useState(null); // Tarjeta seleccionada

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

  // Cargar y procesar el archivo CSV al montar el componente
  useEffect(() => {
    const csvFilePath = require("../documents/csv/noticias_121124.csv");

    Papa.parse(csvFilePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      newline: "\n",
      quoteChar: '"',
      complete: (result) => {
        setCsvData(result.data); // Guardar los datos procesados
      },
      error: (error) => {
        console.error("Error al cargar el archivo CSV:", error);
      },
    });
  }, []);

  // Buscar palabras del diccionario en el texto de la noticia
  const detectarPalabras = (texto) => {
    const palabrasDetectadas = diccionarioDeAcoso.filter((palabra) =>
      texto.toLowerCase().includes(palabra.toLowerCase())
    );
    return palabrasDetectadas;
  };

  // Manejar el clic en una tarjeta
  const handleTarjetaClick = (tarjeta) => {
    const palabrasDetectadas = detectarPalabras(tarjeta.Descripcion); // Detectar palabras
    setSelectedTarjeta({
      noticia: tarjeta.Descripcion,
      autor: tarjeta.Noticiero,
      fecha: tarjeta.Fecha,
      titulo: tarjeta.Titulo,
      palabras: palabrasDetectadas,
    });
    setModalOpen(true); // Abrir el modal
  };

  // Manejar el cierre del modal
  const handleCloseModal = () => {
    setModalOpen(false); // Cerrar el modal
    setSelectedTarjeta(null); // Limpiar la tarjeta seleccionada
  };

  return (
    <div className="historial-container">
      <br />
      {csvData.length === 0 ? (
        <p className="no-historial">Cargando historial...</p>
      ) : (
        <div className="tarjetas-grid">
          {csvData
            .slice() // Crear una copia del arreglo para no modificar el original
            .reverse() // Invertir el orden de los datos
            .map((tarjeta, index) => (
              <Tarjeta
                key={index}
                tarjeta={{
                  titulo: tarjeta.Titulo,
                  noticiero: tarjeta.Noticiero,
                  descripcion: tarjeta.Descripcion,
                  fecha: tarjeta.Fecha,
                }}
                onClick={() => handleTarjetaClick(tarjeta)}
              />
            ))}
        </div>
      )}

      {/* ModalAnalisis */}
      {selectedTarjeta && (
        <ModalAnalisis
          open={modalOpen}
          onClose={handleCloseModal}
          noticia={selectedTarjeta.noticia}
          autor={selectedTarjeta.autor}
          fecha={selectedTarjeta.fecha}
          titulo={selectedTarjeta.titulo}
          palabras={selectedTarjeta.palabras}
        />
      )}
    </div>
  );
}

export default Historial;
