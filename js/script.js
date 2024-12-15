/* *********************************************************************************
IMÁGENES DE FONDO
Se muestra una imagen de fondo que va cambiando cada 10 segundos.
Se crea la variable "contador" con número de imagen para poder aumentarlo y así 
recorrer las imágenes de la carpeta añadiendo el dato a la ruta.
********************************************************************************** */
function iniciarCambioDeFondo(quitarPunto = false) {
    let indiceImagen = Math.floor(Math.random() * 10) + 1; // comenzar con una imagen aleatoria 

    // Configuración del prefijo de la ruta basado en el parámetro:
    const prefijoRuta = quitarPunto ? "./assets/img/" : "../assets/img/";

    // configuración DOM para que arranque con la primera imagen aleatoria:
    document.body.style.backgroundImage = `url(${prefijoRuta}playa${indiceImagen}.jpg)`;

    // cambiar de imagen cada 10 segundos incrementando el indice
    setInterval(() => {
        indiceImagen = indiceImagen < 10 ? indiceImagen + 1 : 1; 
        document.body.style.backgroundImage = `url(${prefijoRuta}playa${indiceImagen}.jpg)`;
    }, 10000);
}

// cargar las imágenes de fondo
iniciarCambioDeFondo();