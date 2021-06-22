import type { NextApiRequest, NextApiResponse } from 'next';
import { getSeedboxDirectoryTreeJsonFile } from 'server/services';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
    getSeedboxDirectoryTreeJsonFile()
  );
}
