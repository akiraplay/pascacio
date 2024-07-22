const CARDS = 7;

// Referencias a los elementos del DOM
let draggableElements = document.querySelector('.draggable-elements');
let droppableElements = document.querySelector('.droppable-elements');
let wrongMsg = document.querySelector('.wrong');
let errorSound = document.getElementById('error-sound'); // Referencia al elemento de audio de error
let successSound = document.getElementById('success-sound'); // Referencia al elemento de audio de acierto
let resetButton = document.getElementById('reset-button'); // Referencia al botón de reinicio

let pokemonSearched = [];
let pokemonNames = [];
let points = 0;

async function startGame() {
    // Limpiar datos previos
    pokemonSearched = [];
    pokemonNames = [];
    points = 0;

    // Petición de los Pokémon a la API
    for (let i = 1; i <= CARDS; i++) {
        let id = getRandomId(150);
        await searchPokemonById(id); // Esperar a que se terminen las búsquedas
    }
}

function getRandomId(max) {
    return Math.floor(Math.random() * max) + 1;
}

async function searchPokemonById(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();
    pokemonSearched.push(data);
    pokemonNames.push(data.name);

    pokemonNames = pokemonNames.sort(() => Math.random() - 0.5); 

    updateUI();
}

function updateUI() {
    draggableElements.innerHTML = '';
    pokemonSearched.forEach(pokemon => {
        draggableElements.innerHTML += `
            <div class="pokemon">
                <img id="${pokemon.name}" draggable="true" src="${pokemon.sprites.other['official-artwork'].front_default}" alt="imagen de ${pokemon.name}" class="image">
            </div>`;
    });

    droppableElements.innerHTML = '';
    pokemonNames.forEach(name => {
        droppableElements.innerHTML += `
            <div class="names">
                <p>${name}</p>
            </div>`;
    });

    addEventListeners();
}

function addEventListeners() {
    let pokemons = document.querySelectorAll('.image');
    pokemons = [...pokemons];
    pokemons.forEach(pokemon => {
        pokemon.addEventListener('dragstart', event => {
            event.dataTransfer.setData('text', event.target.id);
        });
    });

    let names = document.querySelectorAll('.names');
    names = [...names];
    names.forEach(name => {
        name.addEventListener('dragover', event => {
            event.preventDefault();
        });
        name.addEventListener('drop', event => {
            const draggableElementData = event.dataTransfer.getData('text');

            let pokemonElement = document.querySelector(`#${draggableElementData}`);
            if (event.target.innerText == draggableElementData) {
                console.log('si');
                points++;
                event.target.innerHTML = '';
                event.target.appendChild(pokemonElement);
                wrongMsg.innerText = '';
                successSound.play(); // Reproducir el audio de acierto
                if (points == CARDS) {
                    draggableElements.innerHTML = `<p class="win">¡Ganaste!</p>`;
                    showConfetti(); // Mostrar confeti
                }
            } else {
                console.log('no');
                wrongMsg.innerText = 'Ups!!!';
                errorSound.play(); // Reproducir el audio de error
            }
        });
    });
}

function showConfetti() {
    confetti({
        particleCount: 200,
        spread: 300,
        origin: { y: 0.6 },
        scalar: 1.5  // Ajusta el tamaño del confeti
    });
}

// Función para reiniciar el juego
function resetGame() {
    draggableElements.innerHTML = '';
    droppableElements.innerHTML = '';
    wrongMsg.innerText = '';
    startGame(); // Reiniciar el juego
}

// Agregar el evento de clic al botón de reinicio
resetButton.addEventListener('click', resetGame);

// Iniciar el juego al cargar la página
startGame();
