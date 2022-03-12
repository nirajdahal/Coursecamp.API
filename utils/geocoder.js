const NodeGeocoder = require('node-geocoder');

const options = {
    provider: 'mapquest',
    httpAdapter: 'https',
    apiKey: 'BD1ow39OGIb4r6xh3kRnmMR0gvvPBxkF',
  formatter: null
};
let a = process.env.GEOCODER_PROVIDER
const geocoder = NodeGeocoder(options);

module.exports = geocoder;
