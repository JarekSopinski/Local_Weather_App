const CONNECTION_ERROR_MSG = "An error occurred. Please check your internet connection and try again.";
const GEOLOCATION_API_URL = "http://ip-api.com/json";
const WEATHER_API_KEY = "db980b1e7e7f4209e7d4c6b9a782221d";
const ICON_URL = "https://openweathermap.org/img/w/";

const cityDisplay = document.getElementById("city");
const countryDisplay = document.getElementById("country");
const temperatureDisplay = document.getElementById("temperature");
const skyDisplay = document.getElementById("sky");
const iconDisplay = document.getElementById("icon");
const toggleTemperatureBtn = document.getElementById("toggleTemperatureBtn");

let temperatureState;
let temperatureUnitState = "celsius";


const getUserLocation = () => {

    fetch(GEOLOCATION_API_URL)
        .then(response => response.json())
        .then(data => handleGeolocationSuccess(data))
        .then(userLocation => getWeatherData(userLocation))
        .catch(handleError)

};

const handleGeolocationSuccess = (data) => {

    const userLocation = {};
    userLocation.latitude = data.lat;
    userLocation.longitude = data.lon;
    console.log(userLocation);
    return userLocation

};

const getWeatherData = (UserLocation) => {

    const latitude = UserLocation.latitude;
    const longitude = UserLocation.longitude;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API_KEY}`;

    console.log(API_URL);

    fetch(API_URL)
        .then(response => response.json())
        .then(data => handleAPICallSuccess(data))
        .catch(handleError)

};

const handleAPICallSuccess = (data) => {
    console.log(data);

    const weatherData = {};

    weatherData.city = data.name;
    weatherData.country = data.sys.country;
    weatherData.temperature = convertKelvinToCelsius(data.main.temp);
    weatherData.sky = data.weather[0].main;
    weatherData.icon = `${data.weather[0].icon}.png`;

    console.log(weatherData);
    displayData(weatherData);

};

const handleError = () => {
    alert(CONNECTION_ERROR_MSG)
};

const convertKelvinToCelsius = (kelvin) => {

    const difference = 273.15;
    return (kelvin - difference).toFixed(0)
    //TODO: change temp state here

};

const convertCelsiusToFahrenheit = (celsius) => {
    return (celsius * (9/5)) + 32;
};

const convertFahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) * 5/9;
};

//TODO: connect above to a button

const displayData = (weatherData) => {

    const { city, country, temperature, sky, icon } = weatherData;

    cityDisplay.innerText = city;
    countryDisplay.innerText = country;
    temperatureDisplay.innerText = temperature;
    skyDisplay.innerText = sky;
    iconDisplay.insertAdjacentHTML("afterbegin", `<img src=${ICON_URL}${icon}>`);

};

window.addEventListener("load", getUserLocation);