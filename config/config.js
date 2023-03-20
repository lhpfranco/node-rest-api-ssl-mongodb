let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = require('./config.production');
    break;
  case 'staging':
    config = require('./config.staging');
    break;
  case 'development':
  default:
    config = require('./config.development');
    console.log('getting development config');
    break;
}

module.exports = config;
