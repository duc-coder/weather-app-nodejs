const yargs = require('yargs');
const { geocodeAddress } = require('./geocode/geocode');
const { openWeatherInfo } = require('./openWeather/openWeather');

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

geocodeAddress(argv.address, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res);
        openWeatherInfo(res);
    }
});

