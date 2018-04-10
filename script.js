const CONNECTION_ERROR_MSG = "An error occurred. Please check your internet connection and try again.";
const PERMISSION_DENIED_MSG = "This app requires your coordinates to run. Please allow geolocation in your browser.";
const API_KEY = "db980b1e7e7f4209e7d4c6b9a782221d";
const ICON_URL = "http://openweathermap.org/img/w/";

const cityDisplay = document.getElementById("city");
const countryDisplay = document.getElementById("country");
const temperatureDisplay = document.getElementById("temperature");
const skyDisplay = document.getElementById("sky");
const iconDisplay = document.getElementById("icon");


const getUserPosition = () => {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })

};

const handleGeolocationSuccess = (location) => {

    const userLocation = {};
    userLocation.latitude = location.coords.latitude;
    userLocation.longitude = location.coords.longitude;
    console.log(userLocation);
    return userLocation

};

const handleGeolocationError = (error) => {

    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert(PERMISSION_DENIED_MSG);
            break;
        default:
            alert(CONNECTION_ERROR_MSG);
            break;
    }

};

const displayData = (city, country, temperature, sky, icon) => {

    cityDisplay.innerText = city;
    countryDisplay.innerText = country;
    temperatureDisplay.innerText = temperature;
    skyDisplay.innerText = sky;
    iconDisplay.insertAdjacentHTML("afterbegin", `<img src=${ICON_URL}${icon}>`);

};

const handleAPICallSuccess = (data) => {
    console.log(data);

    const city = data.name;
    const country = data.sys.country;
    const temperature = data.main.temp;
    const sky = data.weather[0].main;
    const icon = `${data.weather[0].icon}.png`;

    console.log(city, country, temperature, sky);

    displayData(city, country, temperature, sky, icon)

};

const handleAPICallError = () => {
  alert(CONNECTION_ERROR_MSG)
};

const handleAPICall = (location) => {

    const latitude = location.latitude;
    const longitude = location.longitude;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`;

    console.log(API_URL);

    fetch(API_URL)
        .then(response => response.json())
        .then(data => handleAPICallSuccess(data))
        .catch(error => handleAPICallError())

};

const getWeather = () => {

    getUserPosition()
        .then(location => handleGeolocationSuccess(location))
        .then(location => handleAPICall(location))
        .catch(error => handleGeolocationError(error))

};

window.addEventListener("load", getWeather);