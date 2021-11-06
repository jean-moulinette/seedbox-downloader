import slugify from 'slugify';

export default function getSlugForDirectoryPath(directoryPath: string) {
  return directoryPath.split('/').map(splitedPath => slugify(splitedPath)).join('/');
}