import type { ChildProcessWithoutNullStreams } from 'child_process';
import fs from 'fs';

import contentDisposition from 'content-disposition';
import fsPromises from 'fs/promises';
import mime from 'mime-types';
import type { NextApiResponse } from 'next';

export async function getFileStats(path: string) {
  return fsPromises.stat(path);
}

export function generateResponseError(
  res: NextApiResponse,
  error: {
    message: string
    status: number
  }
) {
  res.status(error.status).json({ message: error.message });
}

type prepareHeadersForFileDownloadArgs = {
  res: NextApiResponse
  filePath: string
  fileName: string
}

export async function prepareHeadersForFileDownload({
  res,
  filePath,
  fileName,
}: prepareHeadersForFileDownloadArgs) {
  const stats = await getFileStats(filePath);
  // Use third party to handle forbidden chars
  const contentDispositionValue = contentDisposition(fileName);
  // Set headers to promp the user to download the file and name the file
  res.setHeader('Content-Disposition', contentDispositionValue);
  res.setHeader('Content-Type', mime.lookup(filePath) || 'application/octet-stream');
  res.setHeader('Content-Length', stats.size);
  res.setHeader('Last-Modified', stats.mtime.toUTCString());
  res.setHeader('Cache-Control', 'max-age=0');
}

export function waitForChildProcessToExit(
  childProcess: ChildProcessWithoutNullStreams
) {
  return new Promise((resolve, reject) => {
    childProcess.on('exit', resolve);
    childProcess.on('close', resolve);
    childProcess.on('error', reject);
    childProcess.stdout.on('data', () => {});
  });
}

export async function pipeFileReadStreamToStream(filePath: string, writableStream: NodeJS.WritableStream) {
  const readStream = fs.createReadStream(filePath);

  await new Promise((resolve) => {
    readStream.pipe(writableStream);
    readStream.on('end', resolve);
  });
}
