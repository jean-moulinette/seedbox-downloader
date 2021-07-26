import type { DirectoryTree } from 'directory-tree';

// Deeply search a directory through a directory tree
export function findRecursiveDirectory(
  pathOfDirectoryToFind: string,
  rootDirectory: DirectoryTree
) {
  if (pathOfDirectoryToFind === rootDirectory.path) return rootDirectory;

  if (rootDirectory.children) {
    let result = null;

    rootDirectory.children.every((children) => {
      result = findRecursiveDirectory(pathOfDirectoryToFind, children);
      return result === null;
    });

    return result;
  }

  return null;
}

export function updateExplorerPathAfterSelection(
  selectedDirectory: DirectoryTree,
  explorerPath: DirectoryTree[]
) {
  const selectedPathsArray = [...explorerPath];
  const lastDirectorySelected = selectedPathsArray[selectedPathsArray.length - 1];
  const isChildrenOfCurrentSelection = lastDirectorySelected.children
    ? lastDirectorySelected.children.some(
      (directoryChildren) => directoryChildren.path === selectedDirectory.path,
    )
    : false;

  if (lastDirectorySelected.path !== selectedDirectory.path) {
    if (isChildrenOfCurrentSelection) {
      selectedPathsArray.push(selectedDirectory);
    } else if (selectedPathsArray.length !== 1) {
      selectedPathsArray.pop();
    }
  }

  return selectedPathsArray;
}
