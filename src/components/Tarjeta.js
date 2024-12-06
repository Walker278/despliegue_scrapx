import React from 'react';
import "../assets/css/tarjeta.css";

// Función para limitar la descripción a 20 palabras
const limitarDescripcion = (descripcion, limite = 20) => {
  const palabras = descripcion.split(" ");
  if (palabras.length > limite) {
    return palabras.slice(0, limite).join(" ") + "..."; // Añade "..." si hay más de 20 palabras
  }
  return descripcion;
};

const Tarjeta = ({ tarjeta, onClick }) => {
  return (
    <div className="tarjeta" onClick={onClick}>
      <h3><strong>Título:</strong> {tarjeta.titulo}</h3>
      <p><strong>Noticiero:</strong> {tarjeta.noticiero}</p>
      <p><strong>Descripción:</strong> {limitarDescripcion(tarjeta.descripcion)}</p> {/* Límite a 20 palabras */}
      <p><strong>Fecha:</strong> {tarjeta.fecha}</p>
    </div>
  );
};

export default Tarjeta;
