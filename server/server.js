const Koa = require('koa');
const auth = require('http-auth');

const routes = require('./routes');
const {
  zipDirectoriesFromDirectory,
  generateDownloaderFolderTreeJsonFile,
} = require('./services');

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

  console.log('\n Seedbox-downloader is now generating the file tree from the directory :');
  console.log(`\n ${configuredDownloadFolder}`);

  try {
    generateDownloaderFolderTreeJsonFile(configuredDownloadFolder);
  } catch (e) {
    console.log('\n Generation of file tree failed, seedbox-downloader can not start');
    console.log(`Error : ${e.message}`);

    return;
  }

  console.log(`\n Seedbox-downloader is now listening on port ${hostingPort}.\n`);

  zipRootDirectories(configuredDownloadFolder)
    .then(() => {})
    .catch(() => {});
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

async function zipRootDirectories(configuredRootDirectory) {
  console.log('Start zipping root directories.\n');

  try {
    await zipDirectoriesFromDirectory(configuredRootDirectory);
  } catch (e) {
    console.log('Failed to zip rootDirectories for reason: \n');
    console.log(e.message);
    return;
  }

  console.log('All root directories has been successfully zipped.\n')
}
