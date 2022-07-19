const yargs = require('yargs');
const axios = require('axios').default;
require('dotenv').config();

let OpenWeatherAPIKey = process.env.NODE_OPEN_WEATHER_API_KEY;
let OPEN_WEATHER_BASE_URL = process.env.NODE_OPEN_WEATHER_BASE_URL;

let GoogleAPIKey = process.env.NODE_GOOGLE_API_KEY;
let GOOGLE_GEOCODE_BASE_URL = process.env.NODE_GOOGLE_GEOCODE_BASE_URL;

let argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Enter your target address',
        string: true,
    }
})
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);

axios.get(`${GOOGLE_GEOCODE_BASE_URL}?address=${encodedAddress}&key=${GoogleAPIKey}`)
    .then((res) => {
        if (res.data.status === 'REQUEST_DENIED') {
            throw new Error('Unauthorized access');

        } else if (res.data.status === 'ZERO_RESULTS') {
            throw new Error('Adress not found');

        };
        console.log('Connect successfully');
        console.log('==========================================================');
        console.log('Address: ' + res.data.results[0].formatted_address);

        let address = res.data.results[0].formatted_address;
        let latitude = res.data.results[0].geometry.location.lat;
        let longtitude = res.data.results[0].geometry.location.lng;

        return axios.get(`${OPEN_WEATHER_BASE_URL}?lat=${latitude}&lon=${longtitude}&appid=${OpenWeatherAPIKey}`)
    })
    .then((res) => {
        let info = res.data;
        console.log('WeatherIcon: ' + info.weather[0].icon);
        console.log('Weather: ' + info.weather[0].main);
        console.log('WeatherDescription: ' + info.weather[0].description);
        console.log('Temperature: ' + info.main.temp);
        console.log('WindSpeed: ' + info.wind.speed);
        console.log('Humidity: ' + info.main.humidity);
        console.log('==========================================================');
    })
    .catch((err) => {
        if (err) {
            console.log('Unable to connect to Google server');
        }
    });