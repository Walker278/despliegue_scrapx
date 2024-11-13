const axios = require('axios');

const API_KEY = 'AIzaSyDwcW1Gkn_NHIMyfSjl_gYSJltXGEOjBE8'; 
const CX = '55dcc8a1678d546a0'; 

function buscarGoogle(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${CX}`;

  axios.get(url)
    .then(response => {
      const data = response.data;
      const results = data.items;

      if (results) {
        results.forEach(item => {
          console.log('Título:', item.title);
          console.log('URL:', item.link);
          console.log('Descripción:', item.snippet);
          console.log('---');
        });
      } else {
        console.log('No se encontraron resultados.');
      }
    })
    .catch(error => {
      console.error('Error al realizar la búsqueda:', error);
    });
}

buscarGoogle('acoso');
