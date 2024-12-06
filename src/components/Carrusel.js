import React, { useEffect, useRef, useState } from 'react';
import "../assets/css/carrusel.css";

// Importación directa de las imágenes
import ac1Img from '../assets/images/acoso1.png';
import ac2Img from '../assets/images/acoso2.png';
import ac3Img from '../assets/images/acoso3.png';
import ac4Img from '../assets/images/acoso4.png';
import ac5Img from '../assets/images/acoso5.png';
import ac6Img from '../assets/images/acoso6.png';

const data = [
  { id: 1, imgUrl: ac1Img },
  { id: 2, imgUrl: ac2Img },
  { id: 3, imgUrl: ac3Img },
  { id: 4, imgUrl: ac4Img },
  { id: 5, imgUrl: ac5Img },
  { id: 6, imgUrl: ac6Img }
];

const Carrusel = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const offset = currentIndex * 100; // Calcula el desplazamiento basado en el índice actual
    listNode.style.transform = `translateX(-${offset}%)`;
    listNode.style.transition = "transform 0.5s ease-in-out";

    // Cambio automático de imagen cada 5 segundos
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(timer);
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((curr) => (curr > 0 ? curr - 1 : curr));
    } else {
      setCurrentIndex((curr) => (curr < data.length - 1 ? curr + 1 : curr));
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="main-container">
      <div className="slider-container">
        <div className="leftArrow" onClick={() => scrollToImage('prev')}>&#10092;</div>
        <div className="rightArrow" onClick={() => scrollToImage('next')}>&#10093;</div>
        <div className="container-images">
          <ul ref={listRef} className="carousel-list">
            {data.map((item) => (
              <li key={item.id} className="carousel-item">
                <img src={item.imgUrl} alt="carrusel" />
              </li>
            ))}
          </ul>
        </div>
        <div className="dots-container">
          {data.map((_, idx) => (
            <div
              key={idx}
              className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
            >
              &#9865;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carrusel;
