import contentDisposition from 'content-disposition';
import mime from 'mime-types';
import type { NextApiResponse } from 'next';
import { ENV_IDENTIFIERS } from 'server/constants';
import { getFileStats } from 'server/services';

interface EnvVars {
  htpasswd: string
  configuredDownloadFolder: string
}

function getEnv(): EnvVars {
  const { DOWNLOAD_DIR, HTPASSWD } = ENV_IDENTIFIERS;

  return {
    htpasswd: process.env[HTPASSWD] !== 'undefined'
      ? process.env[HTPASSWD] as string
      : '',
    configuredDownloadFolder: process.env[DOWNLOAD_DIR] as string,
  };
}

export function getEnvVar(envVar: keyof EnvVars): string {
  return getEnv()[envVar];
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
