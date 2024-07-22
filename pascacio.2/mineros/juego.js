// Importar funciones (asumiendo que las exportaciones están disponibles)
// import {
//   obtenerNumeroAleatorio,
//   obtenerDistancia,
//   obtenerSugerenciaDeDistancia
// } from './helper';

// Coordenadas del tesoro
const ANCHO = 400;
const ALTO = 400;

let objetivo = {
  x: obtenerNumeroAleatorio(ANCHO),
  y: obtenerNumeroAleatorio(ALTO)
};

// Manejador de clics
let $mapa = document.querySelector('#map');
let $distancia = document.querySelector('#distance');
let clics = 0;

$mapa.addEventListener('click', function (e) {
  console.log('clic');
  clics++;
  let distancia = obtenerDistancia(e, objetivo);
  let sugerenciaDistancia = obtenerSugerenciaDeDistancia(distancia);
  $distancia.innerHTML = `<h1>${sugerenciaDistancia}</h1>`;

  if (distancia < 20) {
    alert(`¡Encontraste el tesoro en ${clics} clics!`);
    
    // Ejecutar el efecto de confeti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    // Recargar la página
    location.reload();
  }
});
