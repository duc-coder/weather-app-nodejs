let axios = require('axios').default;
require('dotenv').config();

let OpenWeatherAPIKey = process.env.NODE_OPEN_WEATHER_API_KEY;
let OPEN_WEATHER_BASE_URL = process.env.NODE_OPEN_WEATHER_BASE_URL;

const openWeatherInfo = (position, callback) => {
    let { Latitude, Longtitude } = position;
    axios.get(`${OPEN_WEATHER_BASE_URL}?lat=${Latitude}&lon=${Longtitude}&appid=${OpenWeatherAPIKey}`)
        .then((res) => {
            let info = res.data;
            callback(undefined, {
                weatherIcon: info.weather[0].icon,
                weather: info.weather[0].main,
                weatherDescription: info.weather[0].description,
                temperature: info.main.temp,
                windSpeed: info.wind.speed,
                humidity: info.main.humidity,
            });
        }).catch((err) => {
            if (err) {
                callback('Unable to connect to Open Weather Map server');
            } else if (err.data.cod === 400) {
                callback('NOT FOUND LOCATION');
            };
        });
};

module.exports = {
    openWeatherInfo,
};