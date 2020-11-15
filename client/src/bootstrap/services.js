import 'react-confirm-alert/src/react-confirm-alert.css';

import axios from 'axios';
import noop from 'lodash/noop';
import { confirmAlert } from 'react-confirm-alert';

export function askUserConfirmation(title, onConfirm) {
  confirmAlert({
    title,
    onConfirm,
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    buttons: [
      {
        label: 'Yes',
        onClick: onConfirm,
      },
      {
        label: 'No',
        onClick: noop,
      },
    ],
  });
}

export async function getTreeFromServer() {
  try {
    const response = await axios.get('/get-tree');
    return response.data;
  } catch (e) {
    throw e;
  }
}

export function deleteFileFromServer(filePath) {
  return axios.delete(`/delete-file${filePath}`);
}

// Deeply search a directory through a directory tree
export function findRecursiveStructure(selectedDirectoryPath, rootStructure) {
  let structureFounded = null;

  if (selectedDirectoryPath === rootStructure.path) {
    return rootStructure;
  }

  if (rootStructure.children) {
    // eslint-disable-next-line consistent-return
    rootStructure.children.some((file) => {
      if (file.type === 'directory') {
        if (file.path === selectedDirectoryPath) {
          structureFounded = rootStructure;
          return true;
        }

        if (file.children) {
          file.children.some((childrenFile) => {
            const testPassedForChildren = findRecursiveStructure(
              selectedDirectoryPath,
              childrenFile,
            );

            if (testPassedForChildren) {
              structureFounded = file;
              return true;
            }

            return false;
          });
        }
      }

      return false;
    });
  }

  return structureFounded;
}

export function updateExplorerPathAfterSelection(selectedDirectory, explorerPath) {
  const selectedPathsArray = [...explorerPath];
  const lastDirectorySelected = selectedPathsArray[selectedPathsArray.length - 1];
  const isChildrenOfCurrentSelection = lastDirectorySelected.children.some(
    directoryChildren => directoryChildren.path === selectedDirectory.path,
  );

  if (lastDirectorySelected.path !== selectedDirectory.path) {
    if (isChildrenOfCurrentSelection) {
      selectedPathsArray.push(selectedDirectory);
    } else if (selectedPathsArray.length !== 1) {
      selectedPathsArray.pop();
    }
  }

  return selectedPathsArray;
}
