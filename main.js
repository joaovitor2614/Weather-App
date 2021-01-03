// base: "https://api.openweathermap.org/data/2.5/"
//fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
const weatherIcon = document.querySelector('.weather-icon');
const clearInput = document.querySelector('.clean-input')
const dateElement = document.getElementById('date');
const placeElement = document.getElementById('place');
const tempValue = document.getElementById('temp-value');
const tempDescription = document.getElementById('temp-description');
const searchBox = document.getElementById('searchbox');
// set dateElement to new Date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
dateElement.innerHTML = `${new Date().toLocaleDateString("pt-br", options)}`

const api = {
    KEY: '8691a291898e9904d0759438130f0a40',
    base: 'https://api.openweathermap.org/data/2.5/'
}

// weather type object
weatherType = {
    type: "celsius",
    value: undefined
}
// função para passar de celsius para fahrenheit
function toFahrenheit(temp) {
    return (temp * 9 / 5) + 32
}


searchBox.addEventListener('keypress', searchData)
function searchData(event) {
    if (event.keyCode === 13) {
        getAPIData(searchBox.value)
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
    weatherIcon.innerHTML = `<img src="./icons/${weather.weather[0].icon}.png"/>`
    tempValue.innerHTML = `${Math.round(weather.main.temp)}<span>ºC</span>`
    tempDescription.innerHTML = `${weather.weather[0].description}`
    // guardando valor da temperature dentro do objeto
    weatherType.value = Math.round(weather.main.temp);
    
    
   console.log(weather);
}


tempValue.addEventListener('click', () => {
    if (weatherType.type === "celsius") {
        tempValue.innerHTML = `${toFahrenheit(Math.round(weatherType.value))}<span>F</span>`
        weatherType.type = "fahrenheit"
    } else if (weatherType.type === "fahrenheit") {
        tempValue.innerHTML = `${weatherType.value}<span>ºC</span>`
        weatherType.type = "celsius"
    }
})





// limpar input
clearInput.addEventListener('click', () => {
    searchBox.value = '';
})

