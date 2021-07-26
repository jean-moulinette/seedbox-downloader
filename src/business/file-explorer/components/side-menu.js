import { AppContext } from 'bootstrap/provider';
import { ActionTypes } from 'bootstrap/provider';
import File from 'icons/file/component';
import Folder from 'icons/folder/component';
import noop from 'lodash/noop';
import React from 'react';
import { Layout } from 'ui';

function renderMenuItems(items) {
  return items.map((itemProps) => (
    <Layout.Menu.Item key={itemProps.label} {...itemProps} />
  ));
}

export default class SideMenu extends React.Component {
  getNavigationItems() {
    const navigationItems = this.generateNavigationItems();
    const filesItems = this.generateDirectoryItems();
    const [firstFile, ...restOfFiles] = filesItems;

    return [
      firstFile,
      ...navigationItems,
      ...restOfFiles,
    ];
  }

  generateNavigationItems() {
    const {
      state: {
        directoryTree: { path: rootDirectoryPath },
        selectedDirectory: { path: selectedDirectoryPath },
      },
      dispatch,
    } = this.context;

    if (rootDirectoryPath === selectedDirectoryPath) {
      return [];
    }

    return [
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
      },
    ];
  }

  generateDirectoryItems() {
    const { state: { selectedDirectory }, dispatch } = this.context;
    const { children, path: selectedDirectoryPath } = selectedDirectory;

    // Filter out items that are not directories
    // we want to diplay only directories the navigation menu
    const directoriesItems = children.filter((childrenItem) => childrenItem.type === 'directory');

    const directoryItems = directoriesItems.map((directoryItem) => ({
      label: directoryItem.name,
      icon: (
        <Folder
          width="22"
          height="22"
        />
      ),
      level: 1,
      active: selectedDirectoryPath === directoryItem.path,
      onClick: () => dispatch({
        type: ActionTypes.SET_SELECTED_DIRECTORY,
        payload: directoryItem
      }),
    }));

    return [
      {
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
      },
      ...directoryItems,
    ];
  }

  render() {
    const { state: { directoryTree } } = this.context;

    const menuItems = directoryTree !== null
      ? this.getNavigationItems()
      : [];
    const loading = menuItems.length === 0;

    return (
      <Layout.Menu.Nav loading={loading}>
        { renderMenuItems(menuItems) }
      </Layout.Menu.Nav>
    );
  }
}

SideMenu.contextType = AppContext;
