/* ***********************************************************************
CREAR Y MOSTRAR CONTRASEÑA 
Entre 12 y 50 caracteres. Se podrá elegir el número de caracteres (DOM input)
Se compondrá de mayúsculas, minúsculas, números y símbolos. Mínimo una de cada.
La contraseña aparece tras pulsar el botón que la crea.
************************************************************************ */
function crearContrasena() {
    
    const longitudmax = 50;
    const longitudmin = 12;
    const longitud = parseInt(document.getElementById("length").value); // se recoge el valor introducido en el input
    
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const caracteres = "!@#$%^&*()-_=+";
    const incluyeTodos = mayusculas + minusculas + numeros + caracteres; // unificación de todos los carateres posibles

    console.log('🟣 Longitud:', longitud);
    
    // mensaje de error si la longitud no está dentro del rango
    if (longitud < longitudmin || longitud > longitudmax) {
        alert("La longitud debe estar entre 12 y 50 caracteres.");
        return;
    }
    

    // se crea la variable para la contraseña y en ella metemos un caracter aleatorio de cada
    let contrasena = "";
    contrasena += mayusculas[Math.floor(Math.random() * mayusculas.length)]; // un elemento aleatorio de la cadena mayusculas
    contrasena += minusculas[Math.floor(Math.random() * minusculas.length)]; // un elemento aleatorio de la cadena minisculas
    contrasena += numeros[Math.floor(Math.random() * numeros.length)]; // un elemento aleatorio de la cadena numeros
    contrasena += caracteres[Math.floor(Math.random() * caracteres.length)]; // un elemento aleatorio de la cadena caracteres
    console.log('🟢 4 caracteres uno de cada:', contrasena);

    // y después rellenamos aleatoriamente hasta completar tantos caracteres como se indiquen en el input
    for (let i = contrasena.length; i < longitud; i++) {
        contrasena += incluyeTodos[Math.floor(Math.random() * incluyeTodos.length)];
    }

    // actualización del <span> con la nueva contraseña creada
    document.getElementById("generatedPassword").textContent = contrasena;

    // al hacer click en el botón es cuando tiene que aparecer, pasa de none a block
    document.querySelector("span").style.display = "block"; 
    document.getElementById("generatedPassword").style.display = "block";
    console.log('🔵 Contraseña en DOM:', contrasena);
}