const chokidar = require('chokidar');
const dirTree = require('directory-tree');
const fs = require('fs');
const util = require('util');
const { spawn } = require('child_process');
const fse = require('fs-extra');

const {
  SEEDBOX_DOWNLOADER_TREE_FILE_PATH,
  WATCHER_EVENTS,
} = require('./constants');

const readDir = util.promisify(fs.readdir);

exports.generateZipOnSeedbox = generateZipOnSeedbox;

exports.sanitizeFolderPath = sanitizeFolderPath;

exports.zipDirectoriesFromDirectory = zipDirectoriesFromDirectory;

exports.generateDownloadFolderTreeJsonFile = generateDownloadFolderTreeJsonFile;

exports.initDownloadFolderWatchers = function initDownloadFolderWatchers(
  configuredDownloadFolder,
) {
  const { ADD, ADD_DIR, CHANGE, UNLINK, UNLINK_DIR, ERROR } = WATCHER_EVENTS;

  let downloadFolderWatcher;

  try {
    downloadFolderWatcher = chokidar.watch(
      configuredDownloadFolder,
      {
        persistent: true,
        ignoreInitial: true,
        ignored: '.DS_Store',
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

exports.unlinkFileOnSeedbox = async function unlinkFileOnSeedbox(filePath, configuredDownloadFolder) {
  try {
    const completeFilePath = configuredDownloadFolder + filePath;

    if (!checkIfDownloadFileOrFolderExists(completeFilePath)) {
      console.log(`\n File : ${completeFilePath}`);
      console.log('\n not found for deletion');
      throw new Error('404');
    }

    await fse.remove(completeFilePath);

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);
  } catch (e) {
    throw e;
  }
};

exports.getSeedboxDirectoryTreeJsonFile = function getSeedboxDirectoryTreeJsonFile() {
  let file;
  const readOptions = {
    encoding: 'utf8',
  };

  try {
    file = fs.readFileSync(SEEDBOX_DOWNLOADER_TREE_FILE_PATH, readOptions);
  } catch (e) {
    console.log('\n Fetching downloader folder tree file failed');
    throw e;
  }

  return file;
};

async function zipDirectoriesFromDirectory(directory) {
  try {
    const files = await readDir(directory, {
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

function createOnFileWatcherAdd(configuredDownloadFolder) {
  return function onFileWatcherAdd(path) {
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

    console.log('\n FileWatcherAdd event : ', path);
  }
}

function createOnFileWatcherAddDir(configuredDownloadFolder) {
  return async function onFileWatcherAddDir(path) {
    try {
      await zipDirectoriesFromDirectory(configuredDownloadFolder);
    } catch (e) {
      console.log('\n Error occured on AddDir event while zipping again directories from root');
      console.log(`\n Error : ${e.message}`);
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);

    console.log('\n FileWatcherAddDir event : ', path);
  }
}

function createOnFileWatcherUnlink(configuredDownloadFolder) {
  return function onFileWatcherUnlink(path) {
    const dotPartLastIndex = path.lastIndexOf('.part');
    const isPartFile = dotPartLastIndex !== -1;

    // Skip tree file generation if unlink is due to zipping process
    if (isPartFile) {
      return;
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);

    console.log('\n FileWatcherUnlink event : ', path);
  }
}

function createOnFileWatcherUnlinkDir(configuredDownloadFolder) {
  return function onFileWatcherUnlinkDir(path) {
    try {
      const potentialZippedDirectoryPath = `${path}.zip`;

      if (checkIfDownloadFileOrFolderExists(potentialZippedDirectoryPath)) {
        fs.unlinkSync(potentialZippedDirectoryPath);
      }
    } catch (e) {
      console.log('\n Error occured while trying to unlink zip of deleted directory');
      console.log(`\n Error : ${e.message}`);
    }

    generateDownloadFolderTreeJsonFile(configuredDownloadFolder);

    console.log('\n FileWatcherUnlinkDir event : ', path);
  }
}

function onFileWatcherError(error) {
  console.log('\n Error occured in file watch events');
  console.log(`\n Error : ${error}`);
}

function generateDownloadFolderTreeJsonFile(
  configuredDownloadFolder,
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

async function generateZipOnSeedbox({
  outputZipName,
  inputFolder,
  folderName,
}) {
  try {
    if (checkIfDownloadFileOrFolderExists(`${inputFolder}/../${folderName}.zip`)) {
      return;
    }

    const execCommand = `\
      cd "${inputFolder}" && \
      cd .. && \
      zip -Z store -r "${outputZipName}" "${folderName}" && \
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

function waitForChildProcessToExit(childProcess) {
  return new Promise((resolve, reject) => {
    childProcess.on('exit', resolve);
    childProcess.on('close', resolve);
    childProcess.on('error', reject);
    childProcess.stdout.on('data', () => {});
  })
}

function getSeedboxDirectoryStructure(
  configuredDownloadFolder,
) {
  const directoryStructure = dirTree(configuredDownloadFolder, {}, (file) => {
    file.path = file.path.slice(configuredDownloadFolder.length, file.path.length);
  });

  const sanitizedChildrens = directoryStructure.children.map((treeNode) => {
    if (treeNode.type === 'directory') {
      return sanitizeFolderPath(configuredDownloadFolder, treeNode);
    }

    return treeNode;
  });

  const sanitizedChildrensZipFiltered = sanitizedChildrens.filter(
    (children) => filterOutZippedFolderFiles(children, configuredDownloadFolder),
  );

  return {
    ...directoryStructure,
    children: sanitizedChildrensZipFiltered,
  };
}

function filterOutZippedFolderFiles(treeNode, configuredDownloadFolder) {
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
  configuredDownloadFolder,
  folder,
) {
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

function replaceSpacesWithEscapedSpaces(inputString) {
  const findSpacesRegex = /(\s+)/g;
  return inputString.replace(findSpacesRegex, '\\ ');
}

function checkIfDownloadFileOrFolderExists(path) {
  try {
    fs.accessSync(path, fs.constants.R_OK);
    return true;
  } catch (e) {
    return false;
  }
}

function checkIfFileIsDirectory(path) {
  try {
    return fs.lstatSync(path).isDirectory();
  } catch (e) {
    return false;
  }
}
