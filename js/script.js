/* *********************************************************************************
IMÁGENES DE FONDO
Se muestra una imagen de fondo que va cambiando cada 10 segundos.
Se crea la variable "contador" con número de imagen para poder aumentarlo y así 
recorrer las imágenes de la carpeta añadiendo el dato a la ruta.
********************************************************************************** */
function iniciarCambioDeFondoIndex() {

    let indiceImagenIndex = Math.floor(Math.random() * 10) + 1; // comenzar con una imagen aleatoria 

    // configuración DOM para que arranque con la primera imagen aleatoria:
    document.body.style.backgroundImage = `url(./assets/img/playa${indiceImagenIndex}.jpg)`;

    // cambiar de imagen cada 10 segundos incrementando el indice
    setInterval(() => {
        indiceImagenIndex = indiceImagenIndex < 10 ? indiceImagenIndex + 1 : 1; 
        document.body.style.backgroundImage = `url(./assets/img/playa${indiceImagenIndex}.jpg)`;
    }, 10000);
}


// cargar las imágenes de fondo
iniciarCambioDeFondoIndex()