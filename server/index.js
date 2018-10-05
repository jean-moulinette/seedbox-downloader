const { getUserConfig } = require('../helpers/index.js');
const startServer = require('./server.js');

module.exports = async function initServer() {
  const userConfig = getUserConfig();
  startServer(userConfig);
}
