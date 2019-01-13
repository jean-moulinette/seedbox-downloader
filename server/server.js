const Koa = require('koa');
const send = require('koa-send');
const dirTree = require('directory-tree');

module.exports = function startServer({
  hostingPort,
  folderLocation,
}, devMode) {
  const app = new Koa();

  const htmlIndex = devMode
    ? 'index-dev.html'
    : 'index.html';

  setupAppMiddlewares(app, folderLocation, htmlIndex);

  app.listen(hostingPort);
}

function setupAppMiddlewares(app, folderLocation, htmlIndex) {
  // Serve files
  app.use(async (ctx, next) => {
    const { path, method } = ctx;
    let seedboxFile;

    if (!path.startsWith('/file') || method !== 'GET') return await next();

    try {
      const slashSplit = path.split('/');
      const fileName = slashSplit[slashSplit.length - 1];
      const pathFromRequest = path.split('/file')[1];
      const filePath = folderLocation + pathFromRequest;

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
  });

  // Static resources
  app.use(async (ctx, next) => {
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
  });

  // Server directory structure
  app.use(async (ctx, next) => {
    const { path, method } = ctx;

    if (method !== 'GET' || path !== '/get-tree') return await next();

    const seedboxDirTree = JSON.stringify(
      getSeedboxDirectoryStructure(folderLocation),
    );

    ctx.status = 200;
    ctx.body = seedboxDirTree;
  });

  // Serve html index
  app.use(async (ctx, next) => {
    const { path, method } = ctx;
    const rootPaths = ['/', '/index', '/index.html'];

    if (method !== 'GET' || !rootPaths.some(allowedPath => allowedPath === path)) return await next();

    await send(ctx, `client/public/${htmlIndex}`);
  });

  // 404
  app.use(async (ctx) => {
    const { path } = ctx;

    ctx.status = 404;
    ctx.body = 'Not found';
  });
}

function getSeedboxDirectoryStructure(folderLocation) {
  return dirTree(folderLocation, {}, (file) => {
    file.path = file.path.slice(folderLocation.length, file.path.length);
  });
}
