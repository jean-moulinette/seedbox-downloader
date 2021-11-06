import type { DirectoryTree } from 'directory-tree';
import slugify from 'slugify';

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

export function findRecursiveDirectoryByNameSlug(
  slugToFind: string,
  rootDirectory: DirectoryTree,
) {
  if (slugToFind === slugify(rootDirectory.name)) return rootDirectory;

  if (rootDirectory.children) {
    let result = null;

    rootDirectory.children.every((children) => {
      result = findRecursiveDirectoryByNameSlug(slugToFind, children);
      return result === null;
    });

    return result;
  }

  return null;
}

export function removeChildrensOfDirectoryChildren(tree: DirectoryTree) {
  return tree.children
    ? {
      ...tree,
      children: tree.children.map(directoryChild => {
        delete directoryChild.children;
        return directoryChild;
      })
    }
    : tree;
}
