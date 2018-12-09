// Creates the map itterator callback for normalizeTree function
function createNormalizedChildren(parentRef) {
  return (currentChildren) => {
    if (currentChildren.type === 'directory') {
      if (currentChildren.children) {
        return {
          ...currentChildren,
          parent: parentRef,
          children: currentChildren.children.map(createNormalizedChildren(currentChildren)),
        };
      }

      return {
        ...currentChildren,
        parent: parentRef,
      };
    }


    return currentChildren;
  };
}

// Itterate through a tree and add a reference to the parent directory in each children directories
export function normalizeTree(directoryTree) {
  return {
    ...directoryTree,
    children: directoryTree.children.map(createNormalizedChildren(directoryTree)),
  };
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
