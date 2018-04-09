//api.openweathermap.org/data/2.5/weather?lat=54&lon=18&APPID=db980b1e7e7f4209e7d4c6b9a782221d

let userLatitude;
let userLongitude;

const getUserLocation = () => {

    const handleSuccess = (location) => {
        userLatitude = location.coords.latitude;
        userLongitude = location.coords.longitude;
        console.log(userLatitude, userLongitude);
    };

    const handleError = (error) => {
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

    navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
        :
        alert("Your browser doesn't support geolocation")

};

const getAPIurl = (latitude, longitude) => {
    console.log(`api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=db980b1e7e7f4209e7d4c6b9a782221d`);
    return `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=db980b1e7e7f4209e7d4c6b9a782221d`
};


window.addEventListener("load", getUserLocation);
window.addEventListener("load", () => getAPIurl(userLatitude, userLongitude));