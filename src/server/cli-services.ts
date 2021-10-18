import fs from 'fs';

import chokidar from 'chokidar';
import dirTree from 'directory-tree';
import type { DirectoryTree } from 'directory-tree';
import fsPromises from 'fs/promises';
import {
  SEEDBOX_DOWNLOADER_TREE_FILE_PATH,
  WATCHER_EVENTS,
} from 'server/constants';
import { checkIfDownloadFileOrFolderExists, generateZipOnSeedbox } from 'server/services';

export function initDownloadFolderWatchers(
  configuredDownloadFolder: string,
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

export function generateDownloadFolderTreeJsonFile(
  configuredDownloadFolder: string,
) {
  try {
    const tree = getSeedboxDirectoryStructure(configuredDownloadFolder);
    const jsonTree = JSON.stringify(tree);

    fs.writeFileSync(
      SEEDBOX_DOWNLOADER_TREE_FILE_PATH,
      jsonTree,
    );
  } catch (e) {
    console.log('\n Download folder tree file generation failed');
    throw e;
  }
}

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

function checkIfFileIsDirectory(path: string) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (e) {
    return false;
  }
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

function sanitizeFolderPath(
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

export function getSeedboxDirectoryStructure(
  configuredDownloadFolder: string,
) {
  const directoryStructure = dirTree(
    configuredDownloadFolder,
    {
      // @ts-ignore (due to typing error from module maintainer)
      attributes: ['size', 'type',]
    },
    file => {
      file.path = file.path.slice(configuredDownloadFolder.length, file.path.length);
    },
  );

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

function createOnFileWatcherAdd(
  configuredDownloadFolder: string,
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
  configuredDownloadFolder: string,
) {
  return async function onFileWatcherAddDir(path: string) {
    console.log('\n Directory added : ', path);
    try {
      await zipDirectoriesFromDirectory(configuredDownloadFolder);
    } catch (e) {
      console.log('\n Error occured on AddDir event while zipping again directories from root');
      if (e instanceof Error) {
        console.log(`\n Error : ${e.message}`);
      }
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  };
}

function createOnFileWatcherUnlink(
  configuredDownloadFolder: string,
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
  configuredDownloadFolder: string,
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
      if (e instanceof Error) {
        console.log(`\n Error : ${e.message}`);
      }
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
