/* *********************************************************************************
IMÁGENES DE FONDO
Se muestra una imagen de fondo que va cambiando cada 10 segundos.
Se crea la variable "contador" con número de imagen para poder aumentarlo y así 
recorrer las imágenes de la carpeta añadiendo el dato a la ruta.
********************************************************************************** */
function iniciarCambioDeFondo() {

    let indiceImagen = Math.floor(Math.random() * 10) + 1; // comenzar con una imagen aleatoria 

    // configuración DOM para que arranque con la primera imagen aleatoria:
    document.body.style.backgroundImage = `url(../assets/img/playa${indiceImagen}.jpg)`;

    // cambiar de imagen cada 10 segundos incrementando el indice
    setInterval(() => {
        indiceImagen = indiceImagen < 10 ? indiceImagen + 1 : 1; 
        document.body.style.backgroundImage = `url(../assets/img/playa${indiceImagen}.jpg)`;
    }, 10000);
}


// cargar las imágenes de fondo
iniciarCambioDeFondo()


/* ***********************************************************************
CONSULTAR EL TIEMPO
El tiempo en el momento en el que accedemos a la página con varios elementos:
 - Ciudad y País. <h2>
 - El estado del clima. <p>
 - Imagen y grados celsius de nuestra ciudad. <div>
 - Precipitaciones, humedad y viento km/h. <ul>
 - La previsión por horas en el día en el que estamos. <ul>
   - Con su hora, imagen y grados celsius. <span>
---------------------------------------------------------------------------
API del tiempo de https://www.weatherapi.com/
Necesitarás una API KEY. *
fetch para hacer peticiones a la API. (https://api.weatherapi.com/v1)

    const myKey = '45aa52b473f041b5aff160315241112';
    https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${city}&aqi=no

---------------------------------------------------------------------------
************************************************************************ */
const baseURL = 'https://api.weatherapi.com/v1';
const myKey = '45aa52b473f041b5aff160315241112';
const city = 'Granada';

const cityDOM = document.getElementById('cityName');
const weatherNowDOM = document.getElementById('weatherDescription');
const weatherIconDOM = document.getElementById('currentWeatherIcon');
const currentGradesDOM = document.getElementById('currentTemperature');
const precipitationDOM = document.getElementById('precipitation');
const humidityDOM = document.getElementById('humidity');
const windDOM = document.getElementById('wind');
const forecastWeatherDOM = document.getElementById('forecastWeather');


/* ************************ 
        TIEMPO REAL 
************************* */
async function fetchRealtimeWeather() {
    try {
        const response = await fetch(`${baseURL}/current.json?key=${myKey}&q=${city}&aqi=no`); 
        const data = await response.json(); 
        /* ** */console.log('🟩 Fetch tiempo real. Datos devueltos: ', data);
        
        cityDOM.textContent = `${city} / ${data.location.country}`; // muestra país y ciudad en DOM
        weatherNowDOM.textContent = data.current.condition.text; // muestra breve descripción del tiempo en DOM
        // muestra en DOM todos los datos sobre el tiempo en tiempo real
        weatherIconDOM.src = data.current.condition.icon;
        weatherIconDOM.alt = data.current.condition.text;
        currentGradesDOM.innerHTML = `${data.current.temp_c}<img class="decoImg" src="../assets/img/meteo-deco.png" alt="grados">`;
        precipitationDOM.textContent = `Precipitaciones: ${data.current.precip_mm} mm`; // estos 3 últimos datos van dentro de una ul
        humidityDOM.textContent = `Humedad: ${data.current.humidity}%`;
        windDOM.textContent = `Viento: ${data.current.wind_kph} Km/h`;
    
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}
fetchRealtimeWeather();

/* ************************ 
        PRONÓSTICO 
************************* */
async function fetchForecastWeather() {
    try {
        const response = await fetch(`${baseURL}/forecast.json?key=${myKey}&q=${city}&days=1&aqi=no&alerts=no`);
        const data = await response.json();
        /* ** */console.log('🟦 Fetch pronóstico. Datos devueltos: ', data);

        forecastWeatherDOM.innerHTML = ''; // contenedor vacío para poder actualizar. 
                                           // Se deben ir agregando los elementos <li> al contenedor <ul>

        // en el fetch, dentro de forecast, hay un array forecastday cuya primera posición es el día actual
            // el objeto del día actual contiene información por horas, hay que recorrerlas e ir mostrándolas.
        data.forecast.forecastday[0].hour.forEach(hour => {
            const perHourDOM = document.createElement('li');
            perHourDOM.classList.add('forecast-hour');

            const date = new Date(hour.time); 
            const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(); // colocar cero a la izq. si es menor de 10
            const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(); // colocar cero a la izq. si es menor de 10
            const time = `${hours}:${minutes}`; // se puede hacer así o coger la hora de la API, pero en la segunda opción sería cogerla de un string

            perHourDOM.innerHTML = `
                <span>${time}</span>
                <img class="weather-icon" src="${hour.condition.icon}" alt="${hour.condition.text}">
                <p>${hour.temp_c} °C</p>
            `;

            forecastWeatherDOM.appendChild(perHourDOM);
        });
    } catch (error) {
        console.error('Error al obtener el pronóstico:', error);
    }
}
fetchForecastWeather(); 

/* Notas: 
 - Quería poner la parte de pronóstico para que me mostrase el listado a partir de la hora actual, no las 24h. Pero no he sabido hacerlo.
 - Inicialmente estaba poniendo Alicante y los datos de la API parecen no estar bien. Yo creía que era mi código, pero al probar a poner 
 Granada ya sí traía bien la información */