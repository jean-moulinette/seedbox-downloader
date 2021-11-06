import axios from 'axios';
import type { DirectoryTree } from 'directory-tree';

const treeServices = {
  getTreeFromServer: async (treePath: string[]) => {
    try {
      const directoryPathParams = treePath.map(path => `directoryPath=${path}`);
      const formatedTreePathParam = directoryPathParams.length
        ? directoryPathParams.join('&')
        : 'directoryPath=/';

      const response = await axios.get(`/api/tree?${formatedTreePathParam}`);
      return response.data as DirectoryTree;
    } catch (e) {
      global.console.warn('Error while trying to fetch tree from server');
      throw e;
    }
  },
  deleteFileFromServer: async (filePath: string) => {
    try {
      const response = await axios.delete(`/api/delete-file/${filePath}`);

      if (response.status === 404) {
        throw Error(`Unable to find file to delete (${filePath})`);
      } else if (response.status > 400) {
        throw Error('Server error while trying to delete file from server');
      }
    } catch (e) {
      global.console.warn('Error while trying to delete file from server');
      throw e;
    }
  }
};

export default treeServices;
