/* *********************************************************************************
RELOJ DIGITAL
- Horas, minutos y segundos. Con actualización automática. newDate() setInterval()
- Formatear --> Si el número es < 10, añadir un 0 delante.
- Fecha --> formato DD/MM/AAAA
- Frases dependiendo del intervalo. Condicionales dependiendo de la hora. 
********************************************************************************** */

/* ******************** 
      HORA Y MENSAJE
********************* */
function actualizarReloj() {
    const reloj = new Date();
  
    const horas = reloj.getHours() < 10 ? '0' + reloj.getHours() : reloj.getHours(); // si la hora es menor que diez, colocamos un cero delente
    const minutos = reloj.getMinutes() < 10 ? '0' + reloj.getMinutes() : reloj.getMinutes(); // lo mismo con los minutos
    const segundos = reloj.getSeconds() < 10 ? '0' + reloj.getSeconds() : reloj.getSeconds(); // lo mismo con los segundos
  
    const horaFormateada = `${horas}:${minutos}:${segundos}`;
    /* console.log(`🟦 Hora actual: ${horaFormateada}`); */
  
    document.getElementById("time").textContent = horaFormateada; // se actualiza en el DOM

    // se define el mensaje dentro de la función para que vaya cambiando según la franja horaria
    let mensaje = ""; 

    switch (true) { // `true` para evaluar condiciones en lugar de caso 1, caso 2, etc.
        case (reloj.getHours() >= 0 && reloj.getHours() < 7): // 00:01-07:00
            mensaje = "Hora de descansar, sueña bonito.";
            break;
        case (reloj.getHours() >= 7 && reloj.getHours() < 12): // 07:01-12:00
            mensaje = "Buenos días, desayuna fuerte y ¡a darle al código!";
            break;
        case (reloj.getHours() >= 12 && reloj.getHours() < 14): // 12:01-14:00
            mensaje = "Un ratito más y a disfrutar del menú de hoy.";
            break;
        case (reloj.getHours() >= 14 && reloj.getHours() < 16): // 14:01-16:00
            mensaje = "¡Delicioso! Un descansito para la digestión y seguimos.";
            break;
        case (reloj.getHours() >= 16 && reloj.getHours() < 18): // 16:01-18:00
            mensaje = "Buenas tardes, el último empujón.";
            break;
        case (reloj.getHours() >= 18 && reloj.getHours() < 21): // 18:01-21:00
            mensaje = "Queda poquito para cumplir con la jornada.";
            break;
        case (reloj.getHours() >= 21 && reloj.getHours() < 24): // 21:01-00:00
            mensaje = "Buenas noches, disfruta de tu ratito de ocio.";
            break;
        default:
            mensaje = "Estudia más, algo falla.";
    }

    /* console.log(`🟨 Hora actual: ${mensaje}`); */

    // Mostrar mensaje en el DOM
    document.getElementById("message").textContent = mensaje;
}

setInterval(actualizarReloj, 1000); // usamos setInterval para actualizar cada segundo
// como la función se actualiza cada segundo, aunque en el switch tomamos el dato de la hora, estará actualizado al segundo
actualizarReloj(); 


/* ************* 
      FECHA 
************* */
/* ***************** la fecha cambia sola desde el objeto o también hay que poner setInterval()????? ******************* */
const fecha = new Date(); // nuevo objeto de la clase Date

const dia = fecha.getDate() < 10 ? '0' + fecha.getDate() : fecha.getDate(); // si el día es menor que diez, colocamos un cero delente
const mes = (fecha.getMonth() + 1) < 10 ? '0' + (fecha.getMonth() + 1) : (fecha.getMonth() + 1); // lo mismo con el mes. Como enero es cero, hay que sumar 1.
const anio = fecha.getFullYear(); 

const fechaFormateada = `${dia}/${mes}/${anio}`;     
console.log(`🟩 Fecha actual: ${fechaFormateada}`);

document.getElementById("date").textContent = fechaFormateada; // se actualiza en el DOM