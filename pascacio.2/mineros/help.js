// generar un número aleatorio
let obtenerNumeroAleatorio = tamaño => {
  return Math.floor(Math.random() * tamaño);
}

// obtener la distancia entre dos puntos
let obtenerDistancia = (e, objetivo) => {
  let diferenciaX = e.offsetX - objetivo.x;
  let diferenciaY = e.offsetY - objetivo.y;
  return Math.sqrt((diferenciaX * diferenciaX) + (diferenciaY * diferenciaY));
}

// devolver un mensaje dependiendo de las distancias
let obtenerSugerenciaDeDistancia = distancia => {
  if (distancia < 30) {
      return "¡Hirviendo!";
  } else if (distancia < 40) {
      return "Muy caliente";
  } else if (distancia < 60) {
      return "Caliente";
  } else if (distancia < 100) {
      return "Templado";
  } else if (distancia < 180) {
      return "Frío";
  } else if (distancia < 360) {
      return "Muy frío";
  } else {
      return "¡Congelado!";
  }
}
