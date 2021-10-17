import { spawn } from 'child_process';

import {
  generateDownloadFolderTreeJsonFile,
  initDownloadFolderWatchers,
  zipDirectoriesFromDirectory,
} from 'server/cli-services';
import { ENV_IDENTIFIERS } from 'server/constants';

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
    if (e instanceof Error) {
      console.log(` Error : ${e.message}`);
    }

    return;
  }

  try {
    await zipRootDirectories(configuredDownloadFolder);
  } catch (e) {
    console.log('\n Ziping root directories failed');
    if (e instanceof Error) {
      console.log(` Error : ${e.message}`);
    }
  }

  const startScriptCommand = dev
  ? 'dev'
  : 'start';

  const execCommandArgs = `run ${startScriptCommand} -- -p ${hostingPort}`;

  // Launch next server with env vars
  const nextProcess = spawn(
    'npm',
    execCommandArgs.split(' '),
    {
      env: {
        ...process.env,
        [ENV_IDENTIFIERS.DOWNLOAD_DIR]: configuredDownloadFolder,
        [ENV_IDENTIFIERS.HTPASSWD]: htpasswd || undefined,
      },
      stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
    }
  );

  try {
    console.log(`\n Seedbox will now start watching downloader folder for changes`);
    initDownloadFolderWatchers(configuredDownloadFolder);
  } catch (e) {
    console.log('\n Watching downloader folder failed');
    if (e instanceof Error) {
      console.log(` Error : ${e.message}`);
    }
  }

  if (dev) {
    nextProcess.stdout?.on('data', console.log);
    nextProcess.stderr?.on('data', console.log);
  }
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
    if (e instanceof Error) {
      console.log(e.message);
    }
    return;
  }

  console.log('\n All root directories has been successfully zipped.\n');
}
