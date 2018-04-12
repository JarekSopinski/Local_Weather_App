const PERMISSION_DENIED_MSG = "This app requires your coordinates to run. Please allow geolocation in your browser.";
const CONNECTION_ERROR_MSG = "An error occurred. Please check your internet connection and try again.";
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const WEATHER_API_KEY = "db980b1e7e7f4209e7d4c6b9a782221d";
const ICON_URL = "https://openweathermap.org/img/w/";

const cityDisplay = document.getElementById("city");
const countryDisplay = document.getElementById("country");
const temperatureDisplay = document.getElementById("temperature");
const temperatureUnitDisplay = document.getElementById("temperatureUnit");
const skyDisplay = document.getElementById("sky");
const iconDisplay = document.getElementById("icon");

const userLocation = {};
const weatherData = {};
const temperatureState = {};

const runBrowserGeolocation = () => {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })

};

const getUserLocation = () => {

    runBrowserGeolocation()
        .then(data => passDataToUserLocationObject(data))
        .then(userLocation => getWeatherData(userLocation))
        .catch(error => handleError(error))

};

const passDataToUserLocationObject = (data) => {

    userLocation.latitude = data.coords.latitude;
    userLocation.longitude = data.coords.longitude;
    return userLocation

};

const getWeatherData = (UserLocation) => {

    const latitude = UserLocation.latitude;
    const longitude = UserLocation.longitude;
    const API_URL = `${WEATHER_API_URL}lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => passDataToWeatherDataObject(data))
        .then(weatherData => setInitialTemperatureState(weatherData))
        .catch(error => handleError(error))

};

const passDataToWeatherDataObject = (data) => {

    weatherData.city = data.name;
    weatherData.country = data.sys.country;
    weatherData.temperature = data.main.temp;
    weatherData.sky = data.weather[0].main;
    weatherData.icon = `${data.weather[0].icon}.png`;

    displayData(weatherData);
    return weatherData

};

const displayData = (weatherData) => {

    const { city, country, sky, icon } = weatherData;

    cityDisplay.innerText = city;
    countryDisplay.innerText = country;
    skyDisplay.innerText = sky;
    iconDisplay.insertAdjacentHTML("afterbegin", `<img src=${ICON_URL}${icon} alt=${sky}>`);

};

const setInitialTemperatureState = (weatherData) => {

    temperatureState.currentlyDisplayedUnit = "celsius";
    temperatureState.kelvin = weatherData.temperature;
    temperatureState.celsius = convertKelvinToCelsius(weatherData.temperature);
    temperatureState.fahrenheit = convertKelvinToFahrenheit(weatherData.temperature);

    temperatureDisplay.innerText = temperatureState.celsius;
    temperatureUnitDisplay.innerText = "°C";

};

const toggleTemperatureUnit = () => {

    if (temperatureState.currentlyDisplayedUnit === "celsius") {
        temperatureState.currentlyDisplayedUnit = "fahrenheit";
        temperatureDisplay.innerText = temperatureState.fahrenheit;
        temperatureUnitDisplay.innerText = "°F";
    } else {
        temperatureState.currentlyDisplayedUnit = "celsius";
        temperatureDisplay.innerText = temperatureState.celsius;
        temperatureUnitDisplay.innerText = "°C";
    }

};

const convertKelvinToCelsius = (kelvin) => {
    const difference = 273.15;
    return Math.round((kelvin - difference))
};

const convertKelvinToFahrenheit = (kelvin) => {
    return Math.round((kelvin * 9/5) - 459.67)
};

const handleError = (error) => {

    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert(PERMISSION_DENIED_MSG);
            break;
        default:
            alert(CONNECTION_ERROR_MSG);
            break;
    }

};

window.addEventListener("load", getUserLocation);
temperatureUnitDisplay.addEventListener("click", toggleTemperatureUnit);