// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

// Audios
let winAudio = new Audio('/afro/sounds/win.wav');
let wrongAudio = new Audio('/afro/sounds/wrong.wav');

// Elementos HTML
let MostrarMovimientos = document.getElementById('movimientos');
let MostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

// Lista de imágenes
let imagenes = [
    '/afro/img/1.png', '/afro/img/1.png',
    '/afro/img/2.png', '/afro/img/2.png',
    '/afro/img/3.png', '/afro/img/3.png',
    '/afro/img/4.png', '/afro/img/4.png',
    '/afro/img/5.png', '/afro/img/5.png',
    '/afro/img/6.png', '/afro/img/6.png',
    '/afro/img/7.png', '/afro/img/7.png',
    '/afro/img/8.png', '/afro/img/8.png'
];

// Función para barajar las imágenes
imagenes = imagenes.sort(() => Math.random() - 0.5);

// Función para contar el tiempo
function contarTiempo() {
    tiempoRegresivoId = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

        if (timer === 0) {
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    }, 1000);
}

// Función para bloquear las tarjetas
function bloquearTarjetas() {
    for (let i = 0; i < 16; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="${imagenes[i]}" alt="imagen">`;
        tarjetaBloqueada.disabled = true;
    }
}

// Función principal para destapar tarjetas
function destapar(id) {
    if (temporizador === false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;

    if (tarjetasDestapadas === 1) {
        tarjeta1 = document.getElementById(id);
        primerResultado = imagenes[id];
        tarjeta1.innerHTML = `<img src="${primerResultado}" alt="imagen">`;

        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas === 2) {
        tarjeta2 = document.getElementById(id);
        segundoResultado = imagenes[id];
        tarjeta2.innerHTML = `<img src="${segundoResultado}" alt="imagen">`;

        tarjeta2.disabled = true;

        movimientos++;
        MostrarMovimientos.innerHTML = `Movimientos: ${movimientos}🫣`;

        if (primerResultado === segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            MostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if (aciertos === 8) {
                clearInterval(tiempoRegresivoId);
                MostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🫣`;
                mostrarTiempo.innerHTML = `¡Fantástico! Te demoraste ${timerInicial - timer} segundos ✌🏻😎` ;

                // Activar confeti
                activarConfeti();
            }

        } else {
            wrongAudio.play();
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 800);
        }
    }
}

// Función para activar el confeti
function activarConfeti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Función para reiniciar el juego
function resetGame() {
    clearInterval(tiempoRegresivoId);
    temporizador = false;
    timer = 30;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;

    movimientos = 0;
    MostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    aciertos = 0;
    MostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;

    imagenes = [
        '/afro/img/1.png', '/afro/img/1.png',
        '/afro/img/2.png', '/afro/img/2.png',
        '/afro/img/3.png', '/afro/img/3.png',
        '/afro/img/4.png', '/afro/img/4.png',
        '/afro/img/5.png', '/afro/img/5.png',
        '/afro/img/6.png', '/afro/img/6.png',
        '/afro/img/7.png', '/afro/img/7.png',
        '/afro/img/8.png', '/afro/img/8.png'
    ];

    imagenes = imagenes.sort(() => Math.random() - 0.5);

    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
    }
}
