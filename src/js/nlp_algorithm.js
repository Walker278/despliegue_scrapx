const { dockStart } = require('@nlpjs/basic');
const readline = require('readline');

(async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const pedirTexto = () => {
    return new Promise((resolve) => {
      rl.question('Ingresa un texto: ', (respuesta) => {
        resolve(respuesta);
        rl.close(); 
      });
    });
  };

  const datoUsuario = await pedirTexto();

  const dock = await dockStart({ use: ['Basic']});
  const nlp = dock.get('nlp');
  nlp.addLanguage('es');

  nlp.addDocument('es', 'Nadie te va a querer con esa cara', 'acoso.verbal');
  nlp.addDocument('es', 'Siempre haces todo mal, eres un inútil.', 'acoso.verbal');
  nlp.addDocument('es', 'No sabes nada, ¿por qué no te callas?', 'acoso.verbal');
  nlp.addDocument('es', 'Eres un fracaso, nunca lograrás nada.', 'acoso.verbal');
  nlp.addDocument('es', 'No sé cómo te atreves a mostrarte en público con esa cara.', 'acoso.verbal');
  nlp.addDocument('es', 'Siempre eres el peor en todo, ¿por qué no te callas?', 'acoso.verbal');
  nlp.addDocument('es', '¿De verdad piensas que puedes hacer algo bien? Eres un inútil.', 'acoso.verbal');
  nlp.addDocument('es', 'No mereces estar aquí, siempre arruinas todo.', 'acoso.verbal');
  nlp.addDocument('es', 'Qué vergüenza que sigas existiendo, mejor desaparecerías.', 'acoso.verbal');
  nlp.addDocument('es', 'Nunca vas a ser nada en la vida, te lo aseguro.', 'acoso.verbal');
  nlp.addDocument('es', '¿Cómo te atreves a hablar de eso, si ni siquiera sabes de qué estás hablando?', 'acoso.verbal');
  nlp.addDocument('es', 'Te ves tan estúpido cuando haces eso.', 'acoso.verbal');
  nlp.addDocument('es', '¿Qué te pasa? Nadie te va a soportar con esa actitud.', 'acoso.verbal');

  nlp.addDocument('es', 'Empujar o golpear a alguien de manera intencional', 'acoso.fisico');
  nlp.addDocument('es', 'Sujetar a una persona por el brazo o la ropa de forma agresiva o sin su consentimiento.', 'acoso.fisico');
  nlp.addDocument('es', 'Rodear a alguien en un espacio cerrado, bloqueando su salida y forzándolo a interactuar físicamente.', 'acoso.fisico');
  nlp.addDocument('es', 'Te empujé porque lo necesitaba, ¿qué pasa?', 'acoso.fisico');
  nlp.addDocument('es', 'Te sujeté del brazo porque no me dejabas hablar.', 'acoso.fisico');
  nlp.addDocument('es', 'Si no te apartas, te voy a golpear.', 'acoso.fisico');
  nlp.addDocument('es', 'Te bloqueé el paso para que no te escaparas.', 'acoso.fisico');
  nlp.addDocument('es', 'Empujarte es lo que mereces por lo que dijiste.', 'acoso.fisico');
  nlp.addDocument('es', 'Te toqué porque no tenías derecho a ignorarme.', 'acoso.fisico');
  nlp.addDocument('es', 'Te levanté para que me escuches, no tienes otra opción.', 'acoso.fisico');
  nlp.addDocument('es', 'Te hice caer porque no sabías cómo comportarte.', 'acoso.fisico');
  nlp.addDocument('es', 'No te muevas, voy a decidir por ti.', 'acoso.fisico');
  nlp.addDocument('es', 'Te hice un daño, pero no te preocupes, no es para tanto.', 'acoso.fisico');

  nlp.addDocument('es', 'Enviar correos electrónicos o mensajes de texto con amenazas o comentarios crueles para infundir miedo a la víctima.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Compartir información falsa, difamatoria o personal en línea para dañar la reputación de alguien.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Publicar comentarios hirientes o ataques repetidos en las redes sociales para burlarse o avergonzar a la persona públicamente.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Te voy a difamar en todas las redes sociales para que nadie te crea.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Voy a enviarle a todos tus contactos fotos privadas sin tu permiso.', 'acoso.cibernetico');
  nlp.addDocument('es', '¿Sabías que todos se burlan de ti en internet? ¡Me encanta!', 'acoso.cibernetico');
  nlp.addDocument('es', 'Voy a crear una cuenta falsa solo para hacerte la vida imposible.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Escribe esto en tu perfil o voy a publicar todos tus secretos.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Te voy a mandar mensajes amenazantes hasta que te calles.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Todo lo que publicas en línea está siendo criticado por mí, no te puedes escapar.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Tu vida privada será el chisme de mañana, te lo aseguro.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Voy a poner en línea tus fotos más vergonzosas para que todos las vean.', 'acoso.cibernetico');
  nlp.addDocument('es', 'Te voy a acosar con correos electrónicos hasta que me respondas.', 'acoso.cibernetico');

  nlp.addAnswer('es', 'acoso.verbal', 'Acoso verbal');
  nlp.addAnswer('es', 'acoso.fisico', 'Acoso fisico');
  nlp.addAnswer('es', 'acoso.cibernetico', 'Acoso cibernetico');

  await nlp.train();

  const response = await nlp.process('es', datoUsuario);
  console.log(response);
})();
