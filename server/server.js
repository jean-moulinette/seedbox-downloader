const Koa = require('koa');
const send = require('koa-send');

module.exports = function startServer({
  hostingPort,
  folderLocation,
}) {
  const app = new Koa();

  setupAppMiddlewares(app, folderLocation);

  app.listen(hostingPort);
}

function setupAppMiddlewares(app, folderLocation) {
  // Serve files
  app.use(async (ctx, next) => {
    const { path, method } = ctx;
    let seedboxFile;

    if (!path.startsWith('/file') || method !== 'GET') return await next();

    try {
      const filePath = path.split('/file')[1];
      seedboxFile = await send(ctx, folderLocation + filePath, { root: '/'});
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

    try {
      staticFile = await send(ctx, path, { root: __dirname + '/../public' });
    } catch (e) {
      return await next();
    }

    if (!staticFile) {
      return await next();
    }
  });

  // Serve html index
  app.use(async (ctx, next) => {
    const { path, method } = ctx;
    const rootPaths = ['/', '/index', '/index.html'];

    if (!rootPaths.includes(path) || method !== 'GET') return await next();

    await send(ctx, 'public/index.html');
  });

  // 404
  app.use(async (ctx) => {
    const { path } = ctx;

    ctx.status = 404;
    ctx.body = 'Not found';
  });
}
