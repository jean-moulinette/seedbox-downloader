const send = require('koa-send');

const {
  generateZipOnSeedbox,
  getSeedboxDirectoryStructure,
  sanitizeFolderPath,
} = require('./services');

const createZipFolderRoute = ({
  configuredDownloadFolder,
}) => async function zipFolderRoute(
  ctx,
  next,
) {
  const { path, method } = ctx;
  let archiveFile;

  if (!path.startsWith('/zip-folder') || method !== 'GET') return await next();

  try {
    const slashSplit = path.split('/');
    const lastSplittedPath = slashSplit[slashSplit.length - 1];
    const folderName = decodeURIComponent(lastSplittedPath);

    const pathFromRequest = path.split('/zip-folder')[1];
    const decodedPathFromRequest = decodeURIComponent(pathFromRequest);
    const inputFolder = `${configuredDownloadFolder}${decodedPathFromRequest}`;

    const outputZipName = `${folderName}.zip`;
    const outputZipPath = `${inputFolder}.zip`

    // Set headers to promp the user to download the file and name the file
    ctx.set('Content-Disposition', `attachment; filename="${folderName}.zip"`);

    await generateZipOnSeedbox({
      outputZipName,
      inputFolder,
      folderName,
    });

    archiveFile = await send(
      ctx,
      outputZipPath,
      {
        root: '/',
        hidden: true,
      }
    );
  } catch (e) {
    console.log(`Error while sending ziped folder : ${e.message}`);
    return await next();
  }

  if (!archiveFile) {
    return await next();
  }
}

const createServeFilesRoute = ({
  configuredDownloadFolder,
}) => async function serverFilesRoute(
  ctx,
  next,
) {
  const { path, method } = ctx;
  let seedboxFile;

  if (!path.startsWith('/file') || method !== 'GET') return await next();

  try {
    const slashSplit = path.split('/');
    const fileName = slashSplit[slashSplit.length - 1];
    const pathFromRequest = path.split('/file')[1];
    const filePath = configuredDownloadFolder + pathFromRequest;

    // Set headers to promp the user to download the file and name the file
    ctx.set('Content-Disposition', `attachment; filename="${fileName}"`);

    seedboxFile = await send(
      ctx,
      filePath,
      {
        root: '/',
        hidden: true,
      }
    );
  } catch (e) {
    return await next();
  }

  if (!seedboxFile) {
    return await next();
  }
}

const createStaticResourcesRoute = ({}) => async function stasticResourcesRoute(
  ctx,
  next,
) {
  const { path } = ctx;
  let staticFile;

  // Skip HTML file, we need to compile it, in another middleware
  if (path === '/index.html') return await next();

  try {
    staticFile = await send(ctx, path, { root: __dirname + '/../client/public' });
  } catch (e) {
    return await next();
  }

  if (!staticFile) {
    return await next();
  }
}

const createServeDirectoryStructureRoute = ({
  configuredDownloadFolder,
}) => async function serveDirectoryStructureRoute(ctx, next) {
  const { path, method } = ctx;

  if (method !== 'GET' || path !== '/get-tree') return await next();

  const seedboxDirTree = JSON.stringify(
    getSeedboxDirectoryStructure(configuredDownloadFolder),
  );

  ctx.status = 200;
  ctx.set('Content-Type', 'application/json');
  ctx.body = seedboxDirTree;
};

const createHtmlIndexRoute = ({
  htmlIndex,
}) => async function htmlIndexRoute(ctx, next) {
  const { path, method } = ctx;
  const rootPaths = ['/', '/index', '/index.html'];

  if (method !== 'GET' || !rootPaths.some(allowedPath => allowedPath === path)) return await next();

  await send(ctx, htmlIndex, { root: __dirname + '/../client/public'});
};

const createNotFoundRoute = ({}) => async function notFoundRoute(ctx) {
  ctx.status = 404;
  ctx.body = 'Not found';
};

module.exports = [
  createZipFolderRoute,
  createServeFilesRoute,
  createStaticResourcesRoute,
  createHtmlIndexRoute,
  createServeDirectoryStructureRoute,
  createNotFoundRoute,
];
