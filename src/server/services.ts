import { spawn } from 'child_process';
import type { ChildProcessWithoutNullStreams } from 'child_process';
import fs from 'fs';

import chokidar from 'chokidar';
import dirTree from 'directory-tree';
import type { DirectoryTree } from 'directory-tree';
import fse from 'fs-extra';
import fsPromises from 'fs/promises';
import {
  SEEDBOX_DOWNLOADER_TREE_FILE_PATH,
  WATCHER_EVENTS,
} from 'server/constants';

export function initDownloadFolderWatchers(
  configuredDownloadFolder: string
) {
  const { ADD, ADD_DIR, UNLINK, UNLINK_DIR, ERROR } = WATCHER_EVENTS;

  let downloadFolderWatcher;

  try {
    downloadFolderWatcher = chokidar.watch(
      configuredDownloadFolder,
      {
        persistent: true,
        ignoreInitial: true,
        ignored: [
          '.DS_Store',
          `${configuredDownloadFolder}/*/**`,
        ],
      },
    );
  } catch (e) {
    throw e;
  }

  downloadFolderWatcher.on(
    ADD,
    createOnFileWatcherAdd(configuredDownloadFolder),
  );
  downloadFolderWatcher.on(
    ADD_DIR,
    createOnFileWatcherAddDir(configuredDownloadFolder),
  );
  downloadFolderWatcher.on(
    UNLINK,
    createOnFileWatcherUnlink(configuredDownloadFolder),
  );
  downloadFolderWatcher.on(
    UNLINK_DIR,
    createOnFileWatcherUnlinkDir(configuredDownloadFolder),
  );
  downloadFolderWatcher.on(
    ERROR,
    onFileWatcherError,
  );
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

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  } catch (e) {
    throw e;
  }
};

export function getSeedboxDirectoryTreeJsonFile() {
  try {
    return fs.readFileSync(SEEDBOX_DOWNLOADER_TREE_FILE_PATH, { encoding: 'utf8' });
  } catch (e) {
    console.log('\n Fetching downloader folder tree file failed');
    throw e;
  }
};

export async function zipDirectoriesFromDirectory(
  directory: string
) {
  try {
    const files = await fsPromises.readdir(directory, {
      withFileTypes: true,
    });
    const directories = files.filter(file => file.isDirectory());

    const promisesOfZipping = directories.map((directoryToZip) => {
      const outputZipName = `${directoryToZip.name}.zip`;
      const inputFolder = `${directory}/${directoryToZip.name}`;

      return generateZipOnSeedbox({
        outputZipName,
        inputFolder,
        folderName: directoryToZip.name,
      });
    });

    await Promise.all(promisesOfZipping);
  } catch (e) {
    throw e;
  }
}

function createOnFileWatcherAdd(
  configuredDownloadFolder: string
) {
  return function onFileWatcherAdd(path: string) {
    console.log('\n File added : ', path);
    const dotZipLastIndex = path.lastIndexOf('.zip');
    const dotPartLastIndex = path.lastIndexOf('.part');
    const isZipFile = dotZipLastIndex !== -1;
    const isPartFile = dotPartLastIndex !== -1;

    // Skip tree generation if file is temporary .part file generated due to zip command
    if (isPartFile) {
      return;
    }

    // Skip tree generation if zip file has been generated for downloading zipped folder purpose
    if (isZipFile) {
      const zippedDirectoryPath = path.slice(0, dotZipLastIndex);
      const zipFileMatchWithExistingDirectory = checkIfDownloadFileOrFolderExists(
        zippedDirectoryPath,
      );

      if (zipFileMatchWithExistingDirectory) {
        return;
      }
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  };
}

function createOnFileWatcherAddDir(
  configuredDownloadFolder: string
) {
  return async function onFileWatcherAddDir(path: string) {
    console.log('\n Directory added : ', path);
    try {
      await zipDirectoriesFromDirectory(configuredDownloadFolder);
    } catch (e) {
      console.log('\n Error occured on AddDir event while zipping again directories from root');
      console.log(`\n Error : ${e.message}`);
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  };
}

function createOnFileWatcherUnlink(
  configuredDownloadFolder: string
) {
  return function onFileWatcherUnlink(path: string) {
    console.log('\n File removed : ', path);
    const dotPartLastIndex = path.lastIndexOf('.part');
    const isPartFile = dotPartLastIndex !== -1;

    // Skip tree file generation if unlink is due to zipping process
    if (isPartFile) {
      return;
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  };
}

function createOnFileWatcherUnlinkDir(
  configuredDownloadFolder: string
) {
  return function onFileWatcherUnlinkDir(path: string) {
    try {
      console.log('\n Directory removed : ', path);
      const potentialZippedDirectoryPath = `${path}.zip`;

      if (checkIfDownloadFileOrFolderExists(potentialZippedDirectoryPath)) {
        fs.unlinkSync(potentialZippedDirectoryPath);
      }
    } catch (e) {
      console.log('\n Error occured while trying to unlink zip of deleted directory');
      console.log(`\n Error : ${e.message}`);
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  };
}

function onFileWatcherError(
  error: Error
) {
  console.log('\n Error occured in file watch events');
  console.log(`\n Error : ${error.message}`);
}

export function generateDownloadFolderTreeJsonFile(
  configuredDownloadFolder: string,
) {
  try {
    const tree = getSeedboxDirectoryStructure(configuredDownloadFolder);
    const jsonTree = JSON.stringify(tree);

    const tmpFile = fs.writeFileSync(
      SEEDBOX_DOWNLOADER_TREE_FILE_PATH,
      jsonTree,
    );
  } catch (e) {
    console.log('\n Download folder tree file generation failed');
    throw e;
  }
}

export async function getFileStats(path: string) {
  return fsPromises.stat(path);
}

type generateZipOptions = {
  outputZipName: string,
  inputFolder: string,
  folderName: string
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

function waitForChildProcessToExit(
  childProcess: ChildProcessWithoutNullStreams
) {
  return new Promise((resolve, reject) => {
    childProcess.on('exit', resolve);
    childProcess.on('close', resolve);
    childProcess.on('error', reject);
    childProcess.stdout.on('data', () => {});
  });
}

function getSeedboxDirectoryStructure(
  configuredDownloadFolder: string,
) {
  const directoryStructure = dirTree(configuredDownloadFolder, {}, (file) => {
    file.path = file.path.slice(configuredDownloadFolder.length, file.path.length);
  });

  const sanitizedChildrens = directoryStructure.children
    ? directoryStructure.children.map((treeNode) => {
      if (treeNode.type === 'directory') {
        return sanitizeFolderPath(configuredDownloadFolder, treeNode);
      }

      return treeNode;
    })
    : [];

  const sanitizedChildrensZipFiltered = sanitizedChildrens.filter(
    (children) => filterOutZippedFolderFiles(children, configuredDownloadFolder),
  );

  return {
    ...directoryStructure,
    children: sanitizedChildrensZipFiltered,
  };
}

function filterOutZippedFolderFiles(
  treeNode: DirectoryTree,
  configuredDownloadFolder: string
) {
  const { extension, path } = treeNode;

  if (extension && extension === '.zip') {
    const correspondingDirectoryPath = path.split('.zip')[0];
    const absolutePathDirectoryPath = configuredDownloadFolder + correspondingDirectoryPath;

    if (checkIfFileIsDirectory(absolutePathDirectoryPath)) {
      return false;
    }
  }

  return true;
}

export function sanitizeFolderPath(
  configuredDownloadFolder: string,
  folder: DirectoryTree,
): DirectoryTree {
  const { path: directoryPath, children: directoryChildrens } = folder;

  const newPath = folder.path.slice(configuredDownloadFolder.length, directoryPath.length);

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

export async function pipeFileReadStreamToStream(filePath: string, writableStream: NodeJS.WritableStream) {
  const readStream = fs.createReadStream(filePath);

  await new Promise((resolve) => {
    readStream.pipe(writableStream);
    readStream.on('end', resolve);
  });
}

function checkIfDownloadFileOrFolderExists(path: string) {
  try {
    fs.accessSync(
      path,
      fs.constants.R_OK,
    );

    return true;
  } catch (e) {
    console.log('\n Error while checking file existence : ', e.message);
    return false;
  }
}

function checkIfFileIsDirectory(path: string) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (e) {
    return false;
  }
}
