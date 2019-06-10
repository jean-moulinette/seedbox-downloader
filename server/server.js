const Koa = require('koa');
const auth = require('http-auth');

const routes = require('./routes');

module.exports = function startServer({
  hostingPort,
  configuredDownloadFolder,
  htpasswd,
}, devMode) {
  const app = new Koa();

  const htmlIndex = devMode
    ? 'index-dev.html'
    : 'index.html';

  const serverOptions = {
    app,
    configuredDownloadFolder,
    htmlIndex,
    htpasswd,
  };

  setupAppMiddlewares(serverOptions);

  app.listen(hostingPort);

  console.log(`\n Seedbox-downloader is now listening on port ${hostingPort}.\n`);
}

function setupAppMiddlewares(serverOptions) {
  const { htpasswd, app } = serverOptions;

  // Setup auth
  if (htpasswd) {
    const basic = auth.basic({
      realm: "Seedbox-downloader.",
      file: htpasswd,
    });
    app.use(auth.koa(basic));
  }

  const configuredRoutes = routes.map(
    createRoute => createRoute(serverOptions)
  );

  configuredRoutes.forEach(
    configuredRoute => app.use(configuredRoute)
  );
}
