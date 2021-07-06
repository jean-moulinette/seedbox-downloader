import type { NextApiResponse } from 'next';
import { ENV_IDENTIFIERS } from 'server/constants';

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
