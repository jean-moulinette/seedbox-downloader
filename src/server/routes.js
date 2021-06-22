const send = require('koa-send');
const contentDisposition = require('content-disposition')

const {
  generateZipOnSeedbox,
  getSeedboxDirectoryTreeJsonFile,
  unlinkFileOnSeedbox,
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
    const decodedPath = decodeURI(path);
    const slashSplit = decodedPath.split('/');
    const folderName = slashSplit[slashSplit.length - 1];

    const pathFromRequest = decodedPath.split('/zip-folder')[1];
    const inputFolder = `${configuredDownloadFolder}${pathFromRequest}`;

    const outputZipName = `${folderName}.zip`;
    const outputZipPath = `${inputFolder}.zip`;

    // Use third party to handle forbidden chars
    const contentDispositionValue = contentDisposition(outputZipName);

    // Set headers to promp the user to download the file and name the file
    ctx.set('Content-Disposition', contentDispositionValue);

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
    console.log(`\n Error while sending ziped folder : ${e.message}`);

    ctx.status = 500;
    ctx.body = 'Internal server error :(';

    return;
  }

  if (!archiveFile) {
    ctx.status = 404;
    ctx.body = 'Directory not found';

    return;
  }
};

const createDeleteFileRoute = ({ configuredDownloadFolder }) => async function createDeleteFileRoute(
  ctx,
  next,
) {
  const { path, method } = ctx;

  if (!path.startsWith('/delete-file') || method !== 'DELETE') return await next();

  try {
    const decodedPath = decodeURI(path);
    const slashSplit = decodedPath.split('/');
    const folderName = slashSplit[slashSplit.length - 1];

    const pathFromRequest = decodedPath.split('/delete-file')[1];

    await unlinkFileOnSeedbox(pathFromRequest, configuredDownloadFolder);
  } catch (e) {
    console.log('\n Unable to delete file on /delete-file route');
    console.log(`\n Error : ${e.message}`);

    if (e.message === '404') {
      ctx.status = 404;
      ctx.body = 'Not found';

      return;
    } else {
      ctx.status = 500;
      ctx.body = 'Internal server error :(';

      return;
    }
  }

  ctx.status = 200;
  ctx.body = 'deleted';
};

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
    const decodedPath = decodeURI(path);
    const slashSplit = decodedPath.split('/');
    const fileName = slashSplit[slashSplit.length - 1];
    const pathFromRequest = decodedPath.split('/file')[1];
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
};

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
};

const createServeDirectoryStructureRoute = ({
  configuredDownloadFolder,
}) => async function serveDirectoryStructureRoute(ctx, next) {
  const { path, method } = ctx;

  if (method !== 'GET' || path !== '/get-tree') return await next();

  let jsonTree;

  try {
    jsonTree = getSeedboxDirectoryTreeJsonFile();
  } catch (e) {
    console.log('\n Unable to serve directory tree json file');
    console.log(`\n Error : ${e.message}`);

    ctx.status = 500;
    ctx.body = 'Internal server error :(';

    return;
  }

  ctx.status = 200;
  ctx.set('Content-Type', 'application/json');
  ctx.body = jsonTree;
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
  createDeleteFileRoute,
  createStaticResourcesRoute,
  createHtmlIndexRoute,
  createServeDirectoryStructureRoute,
  createNotFoundRoute,
];
