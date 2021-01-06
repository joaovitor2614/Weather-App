const fhrBtn = document.getElementById('fahrenheitBtn');
const clsBtn = document.getElementById('celsiusBtn');
const kvlBtn = document.getElementById('kelvinBtn');


const placeElement = document.getElementById('cityName')
const dateElement = document.getElementById('date');
const minMaxElement = document.getElementById('minMax');
const tempDescElement = document.getElementById('tempDes');
const tempValueElement = document.getElementById('tempValue');
const searchBtn = document.getElementById('searchBtn');
const inputField = document.getElementById('inputField');
const iconElement = document.querySelector('.icon-wrapper');

// weather object
let temperature = {
    unit: undefined,
    main: undefined,
    min: undefined,
    max: undefined
}

// api key e base
const api = {
    KEY: '8691a291898e9904d0759438130f0a40',
    base: 'https://api.openweathermap.org/data/2.5/'
}


function queryProvider(event) {
    if (event.keyCode === 13) {
        getAPIData(inputField.value)
    }
}

function getAPIData(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.KEY}`)
    .then(weather => {
        return weather.json()
    })
    .then(displayWeather)
}

function displayWeather(weather) {
    
    placeElement.innerHTML = `${weather.name}, ${weather.sys.country}`
    iconElement.innerHTML = `<img id="weatherIcon" class="icon-img" src="./icons/${weather.weather[0].icon}.png">`
    tempDescElement.innerHTML = `${weather.weather[0].description}`
    // mostrar valor de temperature default (celsius)
    temperature.unit = 'celsius'
    temperature.main = Math.round(weather.main.temp)
    temperature.min = Math.round(weather.main.temp_min)
    temperature.max = Math.round(weather.main.temp_max)
    console.log(temperature.min)
    tempValueElement.innerHTML = `${temperature.main} ºC`
    minMaxElement.innerHTML = `<p id="minMax" class="min-max">min: <span>${temperature.min}ºC </span> max: <span>${temperature.max}ºC</span></p>`
}

// funções para transformar e mostrar temperaturas
// passar para fahreinheit
function toFahrenheit(value) {
    
    if (temperature.unit === "celsius") {
        return Math.round((value * 9 / 5) + 32)
    } else if (temperature.unit === "kelvin") {
        return Math.round((value - 273) * 9 / 5 + 32)
    } else {
        return null
    }
}

function displayFahrenheit() {
   
    const fhrMain = toFahrenheit(temperature.main);
    const fhrMin = toFahrenheit(temperature.min);
    const fhrMax = toFahrenheit(temperature.max);
    
    tempValueElement.innerHTML = `${fhrMain} F`
    minMaxElement.innerHTML =  `<p id="minMax" class="min-max">min: <span>${fhrMin} F </span> max: <span>${fhrMax} F</span></p>`;

    temperature.main = fhrMain;
    temperature.min = fhrMin;
    temperature.max = fhrMax;
}

// passar para Kelvin

function toKelvin(value) {
    
    if (temperature.unit === "celsius") {
        return value + 273
    } else if (temperature.unit === "fahrenheit") {
        return Math.round((value - 32) * 5 / 9 + 273)
    } else {
        return null
    }
}

function displayKelvin() {
    const kvlMain = toKelvin(temperature.main);
    const kvlMin = toKelvin(temperature.min);
    const kvlMax = toKelvin(temperature.max);
    
    tempValueElement.innerHTML = `${kvlMain} F`
    minMaxElement.innerHTML =  `<p id="minMax" class="min-max">min: <span>${kvlMin} F </span> max: <span>${kvlMax} F</span></p>`;
    
    temperature.main = kvlMain;
    temperature.min = kvlMin;
    temperature.max = kvlMax;
    
}

// passar para Celsius

function toCelsius(value) {
    
    if (temperature.unit === "kelvin") {
        return value - 273
    } else if (temperature.unit === "fahrenheit") {
        return Math.round((value - 32) * 5 / 9)
    } else {
        return null
    }
}

function displayCelsius() {
   
    const clsMain = toCelsius(temperature.main);
    const clsMin = toCelsius(temperature.min);
    const clsMax = toCelsius(temperature.max);
    
    tempValueElement.innerHTML = `${clsMain} ºC`
    minMaxElement.innerHTML =  `<p id="minMax" class="min-max">min: <span>${clsMin} ºC</span> max: <span>${clsMax} ºC</span></p>`;
    
    temperature.main = clsMain;
    temperature.min = clsMin;
    temperature.max = clsMax;
    
}


// gerar data atual
function getDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const today = new Date().toLocaleDateString('pt-br', 'options')
    dateElement.innerHTML= today
   
}

// gerando data
getDate()




// event handlers
inputField.addEventListener('keypress', queryProvider);



fhrBtn.addEventListener('click', () => {
    if (temperature.unit === undefined) {
        alert("Procure uma cidade primeiro")
        return;
    } else if (temperature.unit === "fahrenheit") {
        return;
    } else {
        displayFahrenheit();
        temperature.unit = "fahrenheit";
    }
    
    
    
    
    
})

kvlBtn.addEventListener('click', () => {
    if (temperature.unit === undefined) {
        alert("Procure uma cidade primeiro")
        return;
    } else if (temperature.unit === "kelvin") {
        return;
    } else {
        displayKelvin();
        temperature.unit = "kelvin";
    }
    
})

clsBtn.addEventListener('click', () => {
    if (temperature.unit === undefined) {
        alert("Procure uma cidade primeiro")
        return;
    } else if (temperature.unit === "celsius") {
        return;
    } else {
        displayCelsius();
        temperature.unit = "celsius";
    }
   
})

searchBtn.addEventListener('click', () => {
    getAPIData(inputField.value)
})


