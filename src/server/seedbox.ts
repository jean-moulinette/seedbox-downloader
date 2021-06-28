import { exec } from 'child_process';

// import auth from 'http-auth';
import {
  generateDownloadFolderTreeJsonFile,
  initDownloadFolderWatchers,
  zipDirectoriesFromDirectory,
} from 'server/services';

interface SeedboxStartOptions {
  dev: boolean
  hostingPort: number
  configuredDownloadFolder: string
  htpasswd: string
}

export default async function startSeedbox({
  hostingPort,
  configuredDownloadFolder,
  htpasswd,
  dev,
}: SeedboxStartOptions) {
  // setupAppMiddlewares(serverOptions);

  console.log('\n Seedbox-downloader is now generating the file tree from the directory :');
  console.log(`\n ${configuredDownloadFolder}`);

  try {
    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  } catch (e) {
    console.log('\n Generation of file tree failed, seedbox-downloader can not start');
    console.log(` Error : ${e.message}`);

    return;
  }

  try {
    console.log(`\n Seedbox will now start watching downloader folder for changes`);
    initDownloadFolderWatchers(configuredDownloadFolder);
  } catch (e) {
    console.log('\n Watching downloader folder failed');
    console.log(` Error : ${e.message}`);
  }

  try {
    await zipRootDirectories(configuredDownloadFolder);
  } catch (e) {
    console.log('\n Ziping root directories failed');
    console.log(` Error : ${e.message}`);
  }

  const startScriptCommand = dev
    ? 'dev'
    : 'start';

  const execCommand = `npm run ${startScriptCommand} -- -p ${hostingPort}`;

  // Launch next server
  const nextProcess = exec(execCommand);

  if (dev) {
    nextProcess.stdout?.on('data', console.log);
    nextProcess.stderr?.on('data', console.log);
  }

  console.log(`\n Seedbox-downloader is now listening on port ${hostingPort}.\n`);
}

async function zipRootDirectories(configuredRootDirectory: string) {
  console.log('\n Start zipping root directories.\n');

  try {
    await zipDirectoriesFromDirectory(configuredRootDirectory);
  } catch (e) {
    console.log('\n Failed to zip rootDirectories for reason: \n');
    console.log(e.message);
    return;
  }

  console.log('\n All root directories has been successfully zipped.\n');
}
