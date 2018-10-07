const Koa = require('koa');
const send = require('koa-send');
const template = require('lodash.template');
const dirTree = require('directory-tree');
const Entities = require('html-entities').XmlEntities;

const { getHtmlIndexAsString } = require('../helpers/index.js');
const entities = new Entities();

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

    // Skip HTML file, we need to compile it, in another middleware
    if (path === '/index.html') return await next();

    try {
      staticFile = await send(ctx, path, { root: __dirname + '/../web/public' });
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

    ctx.body = compileHtmlTemplate(folderLocation);
  });

  // 404
  app.use(async (ctx) => {
    const { path } = ctx;

    ctx.status = 404;
    ctx.body = 'Not found';
  });
}

function compileHtmlTemplate(folderLocation) {
  const seedboxDirTree = JSON.stringify(
    getSeedboxDirectoryStructure(folderLocation)
  );
  const compiled = template(getHtmlIndexAsString());

  return compiled({ directoryStructure: seedboxDirTree });
}

function getSeedboxDirectoryStructure(folderLocation) {
  return dirTree(folderLocation);
}
