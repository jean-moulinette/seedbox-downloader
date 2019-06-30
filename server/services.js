const dirTree = require('directory-tree');
const fs = require('fs');
const util = require('util');
const { spawn } = require('child_process');

exports.generateZipOnSeedbox = async function generateZipOnSeedbox({
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

    await waitForChildProcessToExit(zipChildProcess);

  } catch (e) {
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

exports.getSeedboxDirectoryStructure = function getSeedboxDirectoryStructure(
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

exports.sanitizeFolderPath = sanitizeFolderPath;

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
