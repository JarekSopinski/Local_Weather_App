## Local Weather App

A simple app showing current weather in user's location. User can toggle between Fahrenheit and Celsius. Data is fetched from an open API.

---

#### How it works

1. Browser asks user for permission to get geolcation data. 
2. If succesful, user's latitude and longitude are passed to userLocation object.
2. A request to API is configured based on userLocation object.
3. Weather data is fetched from [OpenWeatherMap](https://openweathermap.org/).
4. Temperature data (in Kelvin) is kept inside temperatureState object. When user toggles between Fahrenheit and Celsius, value of currentlyDisplayedUnit key is changed and temperature in a proper unit is displayed. Celsius is set as default and is displayed right after fetching data.

---

### About

This project created during FreeCodeCamp front-end course. It's a [task from Intermediate Front End Development Projects section.](https://www.freecodecamp.org/challenges/show-the-local-weather). Style was inspired by [FCC sample](https://codepen.io/freeCodeCamp/full/bELRjV).

---

#### License

&copy; 2018 Jarosław Sopiński

This repository is licensed under the MIT license.
