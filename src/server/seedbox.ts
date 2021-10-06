import { exec } from 'child_process';

import type { DirectoryTree } from 'directory-tree';
import {
  generateDownloadFolderTreeJsonFile,
  initDownloadFolderWatchers,
  zipDirectoriesFromDirectory,
} from 'server/cli-services';
import { ENV_IDENTIFIERS, PROCESS_EVENTS } from 'server/constants';
import {
  getHtpasswd,
  getSeedboxDirectoryTreeJsonFile,
} from 'server/services';
import { getEnvVar } from 'server/utils';

interface SeedboxStartOptions {
  dev: boolean
  hostingPort: number
  configuredDownloadFolder: string
  htpasswd?: string | null
}

export default async function startSeedbox({
  hostingPort,
  configuredDownloadFolder,
  htpasswd,
  dev,
}: SeedboxStartOptions) {
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
    await zipRootDirectories(configuredDownloadFolder);
  } catch (e) {
    console.log('\n Ziping root directories failed');
    console.log(` Error : ${e.message}`);
  }

  const startScriptCommand = dev
  ? 'dev'
  : 'start';

  const execCommand = `npm run ${startScriptCommand} -- -p ${hostingPort}`;

  // Launch next server with env vars
  const nextProcess = exec(
    execCommand,
    {
      env: {
        ...process.env,
        [ENV_IDENTIFIERS.DOWNLOAD_DIR]: configuredDownloadFolder,
        [ENV_IDENTIFIERS.HTPASSWD]: htpasswd || undefined,
      }
    }
  );
  const notifyServerProcess = () => nextProcess.send({ event: PROCESS_EVENTS.TREE_UPDATE });

  try {
    console.log(`\n Seedbox will now start watching downloader folder for changes`);
    initDownloadFolderWatchers(configuredDownloadFolder, notifyServerProcess);
  } catch (e) {
    console.log('\n Watching downloader folder failed');
    console.log(` Error : ${e.message}`);
  }

  if (dev) {
    nextProcess.stdout?.on('data', console.log);
    nextProcess.stderr?.on('data', console.log);
  }
}

export function initServer() {
  const htpasswdPath = getEnvVar('htpasswd');
  global.PASSWD = getHtpasswd(htpasswdPath);
  global.SEEDBOX_FILE_TREE = JSON.parse(getSeedboxDirectoryTreeJsonFile()) as DirectoryTree;
  global.INITED = true;
}

export function isServerInited() {
  return !!global.INITED;
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
