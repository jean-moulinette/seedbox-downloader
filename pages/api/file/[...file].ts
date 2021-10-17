import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import {
  generateResponseError,
  pipeFileReadStreamToStream,
  prepareHeadersForFileDownload,
} from 'server/utils';
import { ENV_IDENTIFIERS } from 'src/server/constants';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { file } } = req;

  if (req.method !== 'GET') {
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

  const configuredDownloadFolder = serverRuntimeConfig[ENV_IDENTIFIERS.DOWNLOAD_DIR];
  const decodedPath = Array.isArray(file)
    ? file.map(path =>  decodeURI(path)).join('/')
    : decodeURI(file);
  const slashSplitedPath = decodedPath.split('/');

  const fileName = slashSplitedPath[slashSplitedPath.length - 1];
  const filePath = `${configuredDownloadFolder}${decodedPath}`;

  try {
    await prepareHeadersForFileDownload({
      res,
      filePath,
      fileName,
    });
    pipeFileReadStreamToStream(filePath, res);
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
}
