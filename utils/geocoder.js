const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey: 'BD1ow39OGIb4r6xh3kRnmMR0gvvPBxkF',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
