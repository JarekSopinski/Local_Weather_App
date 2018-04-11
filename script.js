const CONNECTION_ERROR_MSG = "An error occurred. Please check your internet connection and try again.";
const GEOLOCATION_API_URL = "http://ip-api.com/json";
const WEATHER_API_KEY = "db980b1e7e7f4209e7d4c6b9a782221d";
const ICON_URL = "https://openweathermap.org/img/w/";

const cityDisplay = document.getElementById("city");
const countryDisplay = document.getElementById("country");
const temperatureDisplay = document.getElementById("temperature");
const temperatureUnitDisplay = document.getElementById("temperatureUnit");
const skyDisplay = document.getElementById("sky");
const iconDisplay = document.getElementById("icon");

let temperatureState = {
    currentlyDisplayedUnit: null,
    kelvin: null,
    celsius: null,
    fahrenheith: null
};


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
        .then(weatherData => setInitialTemperatureState(weatherData))
        .catch(handleError)

};

const handleAPICallSuccess = (data) => {
    console.log(data);

    const weatherData = {};

    weatherData.city = data.name;
    weatherData.country = data.sys.country;
    weatherData.temperature = data.main.temp;
    weatherData.sky = data.weather[0].main;
    weatherData.icon = `${data.weather[0].icon}.png`;

    console.log(weatherData);
    displayData(weatherData);

    return weatherData

};

const displayData = (weatherData) => {

    const { city, country, sky, icon } = weatherData;

    cityDisplay.innerText = city;
    countryDisplay.innerText = country;
    skyDisplay.innerText = sky;
    iconDisplay.insertAdjacentHTML("afterbegin", `<img src=${ICON_URL}${icon}>`);

};

const setInitialTemperatureState = (weatherData) => {

    temperatureState.currentlyDisplayedUnit = "celsius";
    temperatureState.kelvin = weatherData.temperature;
    temperatureState.celsius = convertKelvinToCelsius(weatherData.temperature);
    temperatureState.fahrenheith = convertKelvinToFahrenheit(weatherData.temperature);

    temperatureDisplay.innerText = temperatureState.celsius;
    temperatureUnitDisplay.innerText = "C";
    console.log(temperatureState);

};

const toggleTemperatureUnit = () => {

    if (temperatureState.currentlyDisplayedUnit === "celsius") {
        temperatureState.currentlyDisplayedUnit = "fahrenheit";
        temperatureDisplay.innerText = temperatureState.fahrenheith;
        temperatureUnitDisplay.innerText = "F";
    } else {
        temperatureState.currentlyDisplayedUnit = "celsius";
        temperatureDisplay.innerText = temperatureState.celsius;
        temperatureUnitDisplay.innerText = "C";
    }

};

const convertKelvinToCelsius = (kelvin) => {
    const difference = 273.15;
    return Math.round((kelvin - difference))
};

const convertKelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin * 9/5) - 459.67)
};

const handleError = () => {
    alert(CONNECTION_ERROR_MSG)
};

window.addEventListener("load", getUserLocation);
temperatureUnitDisplay.addEventListener("click", toggleTemperatureUnit);