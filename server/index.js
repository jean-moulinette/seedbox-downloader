const startServer = require('./server.js');

module.exports = async function initServer(devMode = false, config) {
  startServer(config, devMode);
};
