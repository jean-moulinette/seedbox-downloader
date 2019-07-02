const dirTree = require('directory-tree');
const fs = require('fs');
const util = require('util');
const { spawn } = require('child_process');

const {
  SEEDBOX_DOWNLOADER_TREE_FILE_PATH
} = require('./constants');

const readDir = util.promisify(fs.readdir);

exports.generateZipOnSeedbox = generateZipOnSeedbox;

exports.sanitizeFolderPath = sanitizeFolderPath;

exports.generateDownloaderFolderTreeJsonFile = function generateDownloaderFolderTreeJsonFile(
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

exports.zipDirectoriesFromDirectory = async function zipDirectoriesFromDirectory(directory) {
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
};

async function generateZipOnSeedbox({
  outputZipName,
  inputFolder,
  folderName,
}) {
  try {
    if (checkIfZipExists(`${inputFolder}/../${folderName}.zip`)) {
      return;
    }

    const execCommand = `\
      cd "${inputFolder}" && \
      cd .. && \
      zip -Z store -r "${outputZipName}" "${folderName}" && \
      exit
    `;

    const zipChildProcess = spawn(execCommand, { shell: true });

    console.log(`Start zipping of directory ${inputFolder}\n`);

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

function checkIfZipExists(zipPath) {
  try {
    fs.accessSync(zipPath, fs.constants.R_OK);
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
