import * as React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'ui';
import Folder from 'icons/folder/component';
import File from 'icons/file/component';

import { findRecursiveStructure } from '../services';

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
      ...this.generateActionsItems(),
      firstFile,
      ...navigationItems,
      ...restOfFiles,
    ];
  }

  goToParentDirectory = () => {
    const {
      rootDirectory,
      selectedDirectory,
      updateSelectedDirectory,
    } = this.props;

    const newSelectedStructure = findRecursiveStructure(
      selectedDirectory,
      rootDirectory,
    );

    updateSelectedDirectory(newSelectedStructure || selectedDirectory);
  }

  updateSelection(selectedItem) {
    const { updateSelectedDirectory, selectedDirectory } = this.props;
    const newSelectedStructure = selectedItem.children
      ? selectedItem
      : selectedDirectory;

    updateSelectedDirectory(newSelectedStructure);
  }

  addFolder() {
    console.log(this.props);
  }

  generateActionsItems() {
    return [
      {
        label: 'Add Folder +',
        icon: (
          <span />
        ),
        separator: true,
        active: false,
        level: 0,
        onClick: () => this.addFolder,
      },
    ];
  }

  generateNavigationItems() {
    const {
      rootDirectory: { path: rootDirectoryPath },
      selectedDirectory: { path: selectedDirectoryPath },
    } = this.props;

    if (rootDirectoryPath === selectedDirectoryPath) {
      return [];
    }

    return [
      {
        label: './',
        icon: (
          <File
            width="16"
            height="16"
          />
        ),
        level: 1,
        separator: false,
        active: false,
        onClick: null,
      },
      {
        label: '../',
        icon: (
          <File
            width="16"
            height="16"
          />
        ),
        level: 1,
        separator: false,
        active: false,
        onClick: () => {
          this.goToParentDirectory();
        },
      },
    ];
  }

  generateDirectoryItems() {
    const { selectedDirectory, updateSelectedDirectory } = this.props;

    const { children, path: selectedDirectoryPath } = selectedDirectory;

    // Filter out items that are not directories
    // we want to diplay only directories the navigation menu
    const directoriesItems = children.filter(childrenItem => childrenItem.type === 'directory');

    const directoryItems = directoriesItems.map(directoryItem => ({
      label: directoryItem.name,
      icon: (
        <Folder
          width="16"
          height="16"
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
            width="16"
            height="16"
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
    const { rootDirectory } = this.props;

    const menuItems = rootDirectory !== null
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

SideMenu.defaultProps = {
  rootDirectory: null,
  selectedDirectory: null,
};

SideMenu.propTypes = {
  rootDirectory: PropTypes.shape({
    path: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired,
  }),
  selectedDirectory: PropTypes.shape({
    path: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired,
  }),
  updateSelectedDirectory: PropTypes.func.isRequired,
};
