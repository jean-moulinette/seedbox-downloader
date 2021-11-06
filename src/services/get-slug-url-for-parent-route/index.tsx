import type { NextRouter } from 'next/router';

export default function getSlugUrlForParentRoute(router: NextRouter) {
  const splittedCurrentPath = router.asPath.split('/');
  const parentRoute = splittedCurrentPath.slice(1, splittedCurrentPath.length - 1);

  return parentRoute.join('/');
}