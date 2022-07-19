const axios = require('axios').default;
require('dotenv').config();

let GoogleAPIKey = process.env.NODE_GOOGLE_API_KEY;
let GOOGLE_GEOCODE_BASE_URL = process.env.NODE_GOOGLE_GEOCODE_BASE_URL;

const geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    axios.get(`${GOOGLE_GEOCODE_BASE_URL}?address=${encodedAddress}&key=${GoogleAPIKey}`)
        .then((res) => {
            if (res.data.status === 'REQUEST_DENIED') {
                callback('Unauthorized access');
            } else if (res.data.status === 'OK') {
                console.log('Connect successfully');
                callback(undefined, {
                    Address: res.data.results[0].formatted_address,
                    Latitude: res.data.results[0].geometry.location.lat,
                    Longtitude: res.data.results[0].geometry.location.lng,
                });
            }
        }).catch((err) => {
            if (err) {
                callback('Unable to connect to Google server');
            } else if (status === 'ZERO_RESULTS') {
                callback('Adress not found');
            }
        });
};

module.exports = {
    geocodeAddress,
};