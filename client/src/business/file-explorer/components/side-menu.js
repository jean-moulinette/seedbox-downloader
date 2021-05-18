import * as React from 'react';

import { Layout } from 'ui';
import { APP_COLORS } from 'ui/helpers';
import Folder from 'icons/folder/component';
import File from 'icons/file/component';
import { AppContext } from 'bootstrap/provider';

function renderMenuItems(items) {
  return items.map(itemProps => (
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

  updateSelection(selectedItem) {
    const { updateSelectedDirectory, selectedDirectory } = this.context;
    const newSelectedStructure = selectedItem.children
      ? selectedItem
      : selectedDirectory;

    updateSelectedDirectory(newSelectedStructure);
  }

  generateNavigationItems() {
    const {
      directoryTree: { path: rootDirectoryPath },
      selectedDirectory: { path: selectedDirectoryPath },
      goToParentDirectory,
    } = this.context;

    if (rootDirectoryPath === selectedDirectoryPath) {
      return [];
    }

    return [
      {
        label: '. /',
        icon: (
          <File
            color={APP_COLORS.MENU.ICON}
            width="22"
            height="22"
          />
        ),
        level: 1,
        separator: false,
        active: false,
        onClick: null,
      },
      {
        label: '.. /',
        icon: (
          <File
            color={APP_COLORS.MENU.ICON}
            width="22"
            height="22"
          />
        ),
        level: 1,
        separator: false,
        active: false,
        onClick: () => {
          goToParentDirectory();
        },
      },
    ];
  }

  generateDirectoryItems() {
    const { selectedDirectory, updateSelectedDirectory } = this.context;

    const { children, path: selectedDirectoryPath } = selectedDirectory;

    // Filter out items that are not directories
    // we want to diplay only directories the navigation menu
    const directoriesItems = children.filter(childrenItem => childrenItem.type === 'directory');

    const directoryItems = directoriesItems.map(directoryItem => ({
      label: directoryItem.name,
      icon: (
        <Folder
          color={APP_COLORS.MENU.ICON}
          width="22"
          height="22"
        />
      ),
      level: 1,
      separator: false,
      active: selectedDirectoryPath === directoryItem.path,
      onClick: () => {
        updateSelectedDirectory(directoryItem);
      },
    }));

    return [
      {
        label: selectedDirectory.name,
        icon: (
          <Folder
            color={APP_COLORS.MENU.ICON}
            width="22"
            height="22"
          />
        ),
        separator: true,
        level: 0,
        active: false,
        onClick: () => this.updateSelection(selectedDirectory),
      },
      ...directoryItems,
    ];
  }

  render() {
    const { directoryTree } = this.context;

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
