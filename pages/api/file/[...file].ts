import type { NextApiRequest, NextApiResponse } from 'next';
import {
  generateResponseError,
  getEnvVar,
  pipeFileReadStreamToStream,
  prepareHeadersForFileDownload,
} from 'server/utils';

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

  const configuredDownloadFolder = getEnvVar('configuredDownloadFolder');
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
