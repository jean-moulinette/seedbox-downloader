import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import { getSeedboxDirectoryStructure } from 'server/cli-services';
import { unlinkFileOnSeedbox } from 'server/services';
import { generateResponseError } from 'server/utils';
import { ENV_IDENTIFIERS } from 'src/server/constants';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { file } } = req;

  if (req.method !== 'DELETE') {
    generateResponseError(
      res,
      { status: 405, message: 'Method not allowed'},
    );
    return;
  } else if (!file) {
    generateResponseError(
      res,
      { status: 400, message: 'Bad request, missing payload' },
    );
    return;
  }

  const decodedPath = Array.isArray(file)
    ? file.map(path =>  decodeURI(path)).join('/')
    : decodeURI(file);
    const configuredDownloadFolder = serverRuntimeConfig[ENV_IDENTIFIERS.DOWNLOAD_DIR];

  try {
    await unlinkFileOnSeedbox(decodedPath, configuredDownloadFolder);
    global.SEEDBOX_FILE_TREE = getSeedboxDirectoryStructure(configuredDownloadFolder);
  } catch (e) {
    if (e === 404) {
      generateResponseError(
        res,
        { status: e, message: 'File not found' },
      );
    } else {
      generateResponseError(
        res,
        { status: 500, message: 'Internal error' },
      );
    }

    return;
  }

  res.status(200).json({ message: 'Deleted' });
}
