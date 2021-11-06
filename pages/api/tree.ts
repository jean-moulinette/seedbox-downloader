import {
  findRecursiveDirectoryByNameSlug,
  removeChildrensOfDirectoryChildren,
} from 'bootstrap/services';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSeedboxDirectoryTreeJsonFile } from 'server/services';
import { generateResponseError } from 'server/utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const querySlug = req.query.directoryPath;

  if (querySlug) {
    const slugToFind = querySlug instanceof Array
      ? [
        ...querySlug
      ].pop()
      : querySlug;

    if (slugToFind) {
      const tree = JSON.parse(getSeedboxDirectoryTreeJsonFile());
      const treeForSlug = querySlug === '/'
        ? tree
        : findRecursiveDirectoryByNameSlug(slugToFind, tree);

      if (!treeForSlug) {
        generateResponseError(
          res,
          { status: 404, message: 'Unable to find tree for given params' },
        );
      } else {
        res.status(200).json(
          removeChildrensOfDirectoryChildren(treeForSlug),
        );
      }

      return;
    }
  }

  generateResponseError(
    res,
    { status: 422, message: 'Bad request, missing or malformed payload' },
  );
}
