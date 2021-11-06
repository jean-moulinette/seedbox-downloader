import { AppContext } from 'bootstrap/provider';
import File from 'icons/file/component';
import Folder from 'icons/folder/component';
import noop from 'lodash/noop';
import { useRouter } from 'next/router';
import React, { useContext, useMemo } from 'react';
import type { ReactElement } from 'react';
import getSlugForDirectoryPath from 'services/get-slug-for-directory-path';
import getSlugUrlForParentRoute from 'services/get-slug-url-for-parent-route';
import { Layout } from 'ui';

const SideMenu = (): ReactElement | null => {
  const {
    state: {
      directoryTree,
    },
  } = useContext(AppContext);
  const router = useRouter();
  const menuItems = useMemo(() => {
    if (!directoryTree) {
      return [];
    }

    const rootItem = {
      label: directoryTree.name,
      icon: (
        <Folder
          width="22"
          height="22"
        />
      ),
      level: 0,
      active: false,
      slug: getSlugForDirectoryPath(directoryTree.path),
    };
    const navigationItems = router.asPath === '/'
      ? []
      : [
        {
          label: '.. /',
          icon: (
            <File
              width="22"
              height="22"
            />
          ),
          level: 1,
          active: false,
          slug: getSlugUrlForParentRoute(router),
        }
      ];
    const directories = directoryTree.children?.filter(({ type }) => type === 'directory') || [];
    const directoriesItems = directories.map(directory => ({
      label: directory.name,
      icon: (
        <Folder
          width="22"
          height="22"
        />
      ),
      level: 1,
      active: directoryTree.path === directory.path,
      slug: getSlugForDirectoryPath(directory.path),
    }));

return [
  rootItem,
  ...navigationItems,
  ...directoriesItems,
];
  }, [directoryTree]);
const menuItemsElements = useMemo(() => {
  return menuItems.map(({
    label,
    icon,
    level,
    active,
    slug,
  }) => (
    <Layout.Menu.Item
      key={label}
      label={label}
      icon={icon}
      level={level}
      active={active}
      slug={slug}
    />
  ));
}, [menuItems]);

return (
  <Layout.Menu.Nav loading={directoryTree === null}>
    {menuItemsElements}
  </Layout.Menu.Nav>
);
};

export default SideMenu;
