const { getUserConfig } = require('./helpers/index.js');
const startServer = require('./server.js');

module.exports = async function initServer(devMode = false) {
  const userConfig = getUserConfig();
  startServer(userConfig, devMode);
};
