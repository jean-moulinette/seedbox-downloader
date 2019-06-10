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
    const normalizedFolderPath = replaceSpacesWithEscapedSpaces(inputFolder);
    const normalizedOutputZipName = replaceSpacesWithEscapedSpaces(outputZipName);
    const normalizedFolderName = replaceSpacesWithEscapedSpaces(folderName);

    if (checkIfZipExists(`${inputFolder}/../${folderName}.zip`)) {
      return;
    }

    const execCommand = `\
      cd ${normalizedFolderPath} && \
      cd .. && \
      zip -Z store -r ${normalizedOutputZipName} ${normalizedFolderName} && \
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

  return {
    ...directoryStructure,
    children: sanitizedChildrens,
  };
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
