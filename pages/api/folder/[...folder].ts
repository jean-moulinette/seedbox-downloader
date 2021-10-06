import type { NextApiRequest, NextApiResponse } from 'next';
import { generateZipOnSeedbox } from 'server/services';
import {
  generateResponseError,
  getEnvVar,
  pipeFileReadStreamToStream,
  prepareHeadersForFileDownload,
} from 'server/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query: { folder } } = req;

  if (req.method !== 'GET') {
    generateResponseError(
      res,
      { status: 405, message: 'Method not allowed'},
    );
    return;
  } else if (!folder) {
    generateResponseError(
      res,
      { status: 400, message: 'Bad request, missing payload' },
    );
    return;
  }

  const decodedPath = Array.isArray(folder)
    ? folder.map(path =>  decodeURI(path)).join('/')
    : decodeURI(folder);
  const configuredDownloadFolder = getEnvVar('configuredDownloadFolder');

  const slashSplitedPath = decodedPath.split('/');

  const folderName = slashSplitedPath[slashSplitedPath.length - 1];
  const inputFolder = `${configuredDownloadFolder}${decodedPath}`;

  const outputZipName = `${folderName}.zip`;
  const outputZipPath = `${inputFolder}.zip`;

  try {
    // wait for zip generation if it does not exist yet
    await generateZipOnSeedbox({
      outputZipName,
      inputFolder,
      folderName,
    });

    await prepareHeadersForFileDownload({
      res,
      filePath: outputZipPath,
      fileName: outputZipName,
    });

    pipeFileReadStreamToStream(outputZipPath, res);
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
