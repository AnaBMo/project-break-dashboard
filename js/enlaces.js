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
iniciarCambioDeFondo(quitarPunto = false);

/* ***********************************************************************
ALMACENAR ENLACES
Tendremos 2 inputs. Uno de ellos será el título que aparecerá en cada uno 
de nuestros elementos. Al pulsar el botón de añadir link se añadirá en 
el DOM pero también en nuestro localStorage para poder recuperarlo siempre.
Cada uno de los elementos tendrá el nombre que hemos añadido y el enlace 
al pulsar sobre él (ya sea el texto o el bloque completo). 
También tendrá un botón de eliminar si ya no vamos a hacer uso de él.
Será un listado de links que funcionará de la misma manera tanto en la 
página independiente como en el dashboard.
************************************************************************ */
const nameInput = document.getElementById('name-input');
const urlInput = document.getElementById('url-input');
const addLinkButton = document.getElementById('add-link-button');
const linksContainer = document.getElementById('links-container');

/* *********** GESTIONAR ENLACES *********** */
function gestionarEnlaces(accion, nombre, enlace, elementoDOM) {

    let enlaces = JSON.parse(localStorage.getItem('misEnlaces')) || []; // leer los enlaces o comenzar con array vacío
    
    if (accion === 'cargar') {
        // cargar los enlaces que ya hubiera en localStorage
        linksContainer.innerHTML = ''; // primero se limpia el contenedor para no duplicar
        enlaces.forEach(({ nombre, enlace }) => crearElemento(nombre, enlace));
        console.log('📚 Enlaces cargados desde localStorage:', enlaces);
    
    } else if (accion === 'añadir') {
        if (nombre && enlace) {
            // añadir nuevo enlace a localStorage y DOM
            enlaces.push({ nombre, enlace });
            localStorage.setItem('misEnlaces', JSON.stringify(enlaces)); // guardar en localStorage
            crearElemento(nombre, enlace); // crear elemento en DOM

            console.log(' 🟢Nuevo enlace añadido:', { nombre, enlace });
            console.log(' 🟩 Array tras agregar:', enlaces);
        } 
    
    } else if (accion === 'eliminar') {
        if (nombre) {
            // eliminar enlace de localStorage y DOM
            enlaces = enlaces.filter(enlace => enlace.nombre !== nombre); 
                // nuevo array con todos los enlaces cuyo nombre sea distinto al pasado por parámetro para eliminar
            localStorage.setItem('misEnlaces', JSON.stringify(enlaces)); // se actualiza este array en localStorage
            if (elementoDOM) elementoDOM.remove(); // se elimina el elemento del DOM que correspondía al enlace eliminado

            console.log('🟠 Enlace eliminado:', nombre);
            console.log('🟧 Array tras eliminar:', enlaces);
        } 
    }
}

/* *********** CREAR ELEMENTO EN EL DOM *********** */
function crearElemento(nombre, enlace) {
    const li = document.createElement('li');
    li.innerHTML = `
        <a href="${enlace}" target="_blank">${nombre}</a>
        <button class="delete-button">X</button>
    `;

    // botón para eliminar cada elemento indiviadualmente
    li.querySelector('.delete-button').addEventListener('click', () => {
        gestionarEnlaces('eliminar', nombre, null, li)
    });
    
    linksContainer.appendChild(li); // agreagar el elemento al contenedor
}

/* *********** AÑADIR ENLACE DESDE INPUTS *********** */
function agregarEnlace() {
    const nombre = nameInput.value.trim(); // dato del input
    const enlace = urlInput.value.trim(); // dato del input

    if (nombre && enlace) {
        // si hay datos en el input,
        // llamada a la función para añadir un enlace a partir de los datos de los inputs
        gestionarEnlaces('añadir', nombre, enlace); 
        
        // limpiar inputs
        nameInput.value = '';
        urlInput.value = '';
        console.log('▶️ Inputs reseteados y enlace añadido.');
    
    } else {
        alert('Por favor, completa los dos campos para añadir un enlace.'); 
    }
}

addLinkButton.addEventListener('click', agregarEnlace); // botón añadir

/* *********** INICIAR CARGANDO LOS ENLACES *********** */
gestionarEnlaces('cargar');