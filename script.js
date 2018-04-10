const userPosition = {
    latitude: null,
    longitude: null
};

const getUserPosition = () => {

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })

};

const handleGeolocationSuccess = (location) => {
    userPosition.latitude = location.coords.latitude;
    userPosition.longitude = location.coords.longitude;
    console.log(userPosition);
};

const handleGeolocationError = (error) => {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("This app requires your coordinates to run. Please allow geolocation in your browser.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out");
            break;
        default:
            alert("An unknown error occurred.");
            break;
    }
};

const getWeather = () => {

    getUserPosition()
        .then(position => handleGeolocationSuccess(position))
        .catch(error => handleGeolocationError(error))

};

window.addEventListener("load", getWeather);