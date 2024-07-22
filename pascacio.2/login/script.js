// Seleccionar elementos necesarios del DOM
const dropdownInput = document.querySelector('.dropdown-input');
const dropdownList = document.querySelector('.dropdown-list');

// Agregar evento de clic a cada elemento <li> del dropdown
dropdownList.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
        dropdownInput.value = item.dataset.value; // Actualizar el valor del input
        dropdownList.style.display = 'none'; // Ocultar la lista desplegable después de seleccionar
    });
});

// Mostrar u ocultar la lista desplegable al hacer clic en el input
dropdownInput.addEventListener('click', () => {
    dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
});

// Ocultar la lista desplegable si se hace clic fuera de ella
document.addEventListener('click', (e) => {
    if (!dropdownInput.contains(e.target)) {
        dropdownList.style.display = 'none';
    }
});


// Script de la bienvenida con la imagen
let modal = document.getElementById("myModal");

window.onload = function() {
    modal.style.display = "block";
};

let close_img = document.getElementById("close_img");
close_img.addEventListener("click", function() {
    modal.style.display = "none";
});





//script de la geolocalizacion 

document.getElementById('geolocateBtn').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location').textContent = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('location').textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').textContent = "An unknown error occurred.";
            break;
    }
}
