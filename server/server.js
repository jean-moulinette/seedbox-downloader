const Koa = require('koa');
const send = require('koa-send');
const auth = require('http-auth');
const dirTree = require('directory-tree');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = function startServer({
  hostingPort,
  configuredDownloadFolder,
  htpasswd,
}, devMode) {
  const app = new Koa();

  const htmlIndex = devMode
    ? 'index-dev.html'
    : 'index.html';

  setupAppMiddlewares(app, configuredDownloadFolder, htmlIndex, htpasswd);

  app.listen(hostingPort);

  console.log(`\n Seedbox-downloader is now listening on port ${hostingPort}.\n`);
}

function setupAppMiddlewares(app, configuredDownloadFolder, htmlIndex, htpasswd) {
  // Auth
  if (htpasswd) {
    const basic = auth.basic({
      realm: "Seedbox-downloader.",
      file: htpasswd,
    });

    // Setup auth.
    app.use(auth.koa(basic));
  }

  // Zip folder
  app.use(async (ctx, next) => {
    const { path, method } = ctx;
    let archiveFile;

    if (!path.startsWith('/zip-folder') || method !== 'GET') return await next();

    try {
      const slashSplit = path.split('/');
      const lastSplittedPath = slashSplit[slashSplit.length - 1];
      const folderName = decodeURIComponent(lastSplittedPath);

      const pathFromRequest = path.split('/zip-folder')[1];
      const inputFolder = `${configuredDownloadFolder}${pathFromRequest}`;

      const outputZipName = `${folderName}.zip`;
      const outputZipPath = `${inputFolder}.zip`

      // Set headers to promp the user to download the file and name the file
      ctx.set('Content-Disposition', `attachment; filename="${folderName}.zip"`);

      await generateZipOnSeedbox({
        outputZipName,
        inputFolder,
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
  });

  // Serve files
  app.use(async (ctx, next) => {
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
      getSeedboxDirectoryStructure(configuredDownloadFolder),
    );

    ctx.status = 200;
    ctx.set('Content-Type', 'application/json');
    ctx.body = seedboxDirTree;
  });

  // Serve html index
  app.use(async (ctx, next) => {
    const { path, method } = ctx;
    const rootPaths = ['/', '/index', '/index.html'];

    if (method !== 'GET' || !rootPaths.some(allowedPath => allowedPath === path)) return await next();

    await send(ctx, htmlIndex, { root: __dirname + '/../client/public'});
  });

  // 404
  app.use(async (ctx) => {
    ctx.status = 404;
    ctx.body = 'Not found';
  });
}

async function generateZipOnSeedbox({outputZipName, inputFolder}) {
  try {
    const execCommand = `\
      cd ${inputFolder} && \
      zip -r ${outputZipName} *
    `;
    const { stdout, stderr } = await exec(execCommand);
  } catch (e) {
    console.log(stdout, stderr)
    throw e;
  }
}

function getSeedboxDirectoryStructure(configuredDownloadFolder) {
  const directoryStructure = dirTree(configuredDownloadFolder, {}, (file) => {
    file.path = file.path.slice(configuredDownloadFolder.length, file.path.length);
  });

  const sanitizedChildrens = directoryStructure.children.map((treeNode) => {
    if (treeNode.type === 'directory') {
      return sanitizeFolderPath(configuredDownloadFolder, treeNode);
    }

    return treeNode;
  });

  return {
    ...directoryStructure,
    children: sanitizedChildrens,
  };
}

function sanitizeFolderPath(configuredDownloadFolder, folder) {
  const { path: directoryPath, children: directoryChildrens } = folder;

  const newPath = folder.path.slice(configuredDownloadFolder.length, folder.path.length);

  if (directoryChildrens && directoryChildrens.length) {

    const newChildrens = directoryChildrens.map((folderChild) => {
      if (folderChild.type === 'directory') {
        return sanitizeFolderPath(configuredDownloadFolder, folderChild);
      }

      return folderChild;
    });

    return {
      ...folder,
      children: newChildrens,
      path: newPath,
    };
  }
  return {
    ...folder,
    path: newPath,
  };
}
