import { AppContext } from 'bootstrap/provider';
import { useRouter } from 'next/router';
import React, { useContext, useMemo } from 'react';
import type { ReactElement } from 'react';
import slugify from 'slugify';
import { Layout } from 'ui';

import FilesGrid from './components/files-grid';

export default function FileWindow(): ReactElement {
  const router = useRouter();
  const {
    state: {
      explorerPath,
      directoryTree,
    },
  } = useContext(AppContext);

  const breadCrumbItems = useMemo(() => directoryTree && explorerPath.map((directory, directoryIndex) => {
    const isActiveItem = slugify(directoryTree.name) === directory;
    return {
      label: directory,
      key: directory,
      active: isActiveItem,
      onClick: () => {
        const computedRoute = router.asPath.split('/').slice(0, directoryIndex + 1).join('/');
        const routeToPushIsRoot = !computedRoute;
        const routeToPush = routeToPushIsRoot ? '/' : computedRoute;
        const asParam = routeToPushIsRoot ? '/' : '/[...slug]';

        router.push(asParam, routeToPush);
      },
    };
  }), [explorerPath, directoryTree]);

  return (
    <Layout.SideWindow>
      <Layout.Loader active={directoryTree === null} />
      <Layout.BreadCrumb items={breadCrumbItems} />
      <FilesGrid />
    </Layout.SideWindow>
  );
}
