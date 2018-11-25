export function findRecursiveStructure(selectedDirectory, rootStructure) {
  const { path } = selectedDirectory;
  let structureFounded = null;

  if (path === rootStructure.path) {
    return rootStructure;
  }

  if (rootStructure.children) {
    // eslint-disable-next-line consistent-return
    rootStructure.children.some((file) => {
      if (file.type === 'directory') {
        if (file.path === path) {
          structureFounded = rootStructure;
          return true;
        }

        if (file.children) {
          file.children.some((childrenFile) => {
            const testPassedForChildren = findRecursiveStructure(selectedDirectory, childrenFile);

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
