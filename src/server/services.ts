import { spawn } from 'child_process';
import fs from 'fs';

import fse from 'fs-extra';
import { SEEDBOX_DOWNLOADER_TREE_FILE_PATH } from 'server/constants';
import { waitForChildProcessToExit } from 'server/utils';

export function getHtpasswd(htpasswdPath: string | null | undefined) {
  if (!htpasswdPath) {
    return null;
  }

  return fs.readFileSync(htpasswdPath, { encoding: 'utf8' });
}

type generateZipOptions = {
  outputZipName: string,
  inputFolder: string,
  folderName: string
};

export function getSeedboxDirectoryTreeJsonFile() {
  try {
    return fs.readFileSync(SEEDBOX_DOWNLOADER_TREE_FILE_PATH, { encoding: 'utf8' });
  } catch (e) {
    console.log('\n Fetching downloader folder tree file failed');
    throw e;
  }
};

export async function generateZipOnSeedbox({
  outputZipName,
  inputFolder,
  folderName,
}: generateZipOptions) {
  try {
    if (checkIfDownloadFileOrFolderExists(`${inputFolder}/../${folderName}.zip`)) {
      return;
    }

    const execCommand = `\
      cd "${inputFolder}" && \
      cd .. && \
      zip -b /tmp -Z store -r "${outputZipName}" "${folderName}" && \
      chmod -R g+w "${outputZipName}" && \
      exit
    `;

    const zipChildProcess = spawn(execCommand, { shell: true });

    console.log(`\n Start zipping of directory ${inputFolder}\n`);

    await waitForChildProcessToExit(zipChildProcess);

    console.log(`\n Zip of ${inputFolder} done.\n`);

  } catch (e) {
    console.log(`\n Zip of ${inputFolder} failed.\n`);
    throw e;
  }
}

export function checkIfDownloadFileOrFolderExists(path: string) {
  try {
    fs.accessSync(
      path,
      fs.constants.R_OK,
    );

    return true;
  } catch (e) {
    if (e instanceof Error) {
      console.log('\n Error while checking file existence : ', e.message);
    }

    return false;
  }
}

export async function unlinkFileOnSeedbox(
  filePath: string,
  configuredDownloadFolder: string
) {
  try {
    const completeFilePath = configuredDownloadFolder + filePath;

    if (!checkIfDownloadFileOrFolderExists(completeFilePath)) {
      console.log(`\n File : ${completeFilePath}`);
      console.log('\n not found for deletion');
      throw 404;
    }

    await fse.remove(completeFilePath);
  } catch (e) {
    throw e;
  }
};
