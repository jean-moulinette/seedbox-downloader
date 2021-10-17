import { AppContext } from 'bootstrap/provider';
import { ActionTypes } from 'bootstrap/provider';
import File from 'icons/file/component';
import Folder from 'icons/folder/component';
import noop from 'lodash/noop';
import React, { useContext, useMemo } from 'react';
import type { ReactElement } from 'react';
import { Layout } from 'ui';

function renderMenuItems(items: {
  label: string
  icon: ReactElement
  level: number
  active: boolean
  onClick: () => void
}[]) {
  return items.map((itemProps) => (
    <Layout.Menu.Item key={itemProps.label} {...itemProps} />
  ));
}

const SideMenu = (): ReactElement | null => {
  const {
    state: {
      selectedDirectory,
      directoryTree,
    },
    dispatch,
  } = useContext(AppContext);

  const menuItems = useMemo(() => {
    if (!selectedDirectory || !directoryTree) {
      return [];
    }

    const rootItem = {
      label: selectedDirectory.name,
      icon: (
        <Folder
          width="22"
          height="22"
        />
      ),
      level: 0,
      active: false,
      onClick: noop,
    };
    const navigationItems = directoryTree.path === selectedDirectory.path
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
            onClick: () => dispatch({
              type: ActionTypes.GO_TO_PARENT_DIRECTORY
            }),
          }
        ];
    const directories = selectedDirectory.children?.filter(({ type }) =>  type !== 'directory') || [];
    const directoriesItems = directories.map(directory => ({
      label: directory.name,
      icon: (
        <Folder
          width="22"
          height="22"
        />
      ),
      level: 1,
      active: selectedDirectory?.path === directory.path,
      onClick: () => dispatch({
        type: ActionTypes.SET_SELECTED_DIRECTORY,
        payload: directory
      })
    }));

    return [
      rootItem,
      ...navigationItems,
      ...directoriesItems,
    ];
  }, [selectedDirectory, directoryTree]);

  const loading = directoryTree === null;

  return (
    <Layout.Menu.Nav loading={loading}>
      { loading ? [] : renderMenuItems(menuItems) }
    </Layout.Menu.Nav>
  );
};

export default SideMenu;
