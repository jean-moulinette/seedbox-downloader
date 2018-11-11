import * as React from 'react';
import PropTypes from 'prop-types';

import { Layout } from 'ui';
import Folder from 'icons/folder/component';
import File from 'icons/file/component';

function findRecursiveStructure(selectedStructure, rootStructure) {
  const { path } = selectedStructure;
  let structureFounded = null;

  if (path === rootStructure.path) {
    return rootStructure;
  }

  if (rootStructure.children) {
    // eslint-disable-next-line consistent-return
    rootStructure.children.some((file) => {
      if (file.type === 'directory') {
        if (file.path === path) {
          structureFounded = rootStructure;
          return true;
        }

        if (file.children) {
          file.children.some((childrenFile) => {
            const testPassedForChildren = findRecursiveStructure(selectedStructure, childrenFile);

            if (testPassedForChildren) {
              structureFounded = file;
              return true;
            }

            return false;
          });
        }
      }

      return false;
    });
  }

  return structureFounded;
}

export default class SideMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      structure: props.rootDirectory,
      selectedStructure: props.rootDirectory,
      topDirectoryPath: props.rootDirectory.path,
      selectedItem: null,
    };
  }

  addFolder = () => {
    console.log(this.state);
  }

  goToParentDirectory = () => {
    const { state } = this;
    const { structure, selectedStructure } = state;
    const newSelectedStructure = findRecursiveStructure(
      selectedStructure,
      structure,
    );

    this.setState({
      ...state,
      selectedStructure: newSelectedStructure || selectedStructure,
      selectedItem: null,
    });
  }

  updateSelection(selectedItem) {
    const { state, selectedStructure } = this.state;
    const newSelectedStructure = selectedItem.children
      ? selectedItem
      : selectedStructure;

    this.setState({
      ...state,
      selectedItem,
      selectedStructure: newSelectedStructure,
    });
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
        onClick: this.addFolder,
      },
    ];
  }

  generateNavigationItems() {
    const { topDirectoryPath, selectedStructure: { path } } = this.state;

    if (topDirectoryPath === path) {
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
    const { selectedItem, selectedStructure } = this.state;

    const { children } = selectedStructure;

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
      active: selectedItem !== null && selectedItem.path === directoryItem.path,
      onClick: () => {
        this.updateSelection(directoryItem);
      },
    }));

    return [
      {
        label: selectedStructure.name,
        icon: (
          <Folder
            width="16"
            height="16"
          />
        ),
        separator: true,
        level: 0,
        active: false,
        onClick: () => this.updateSelection(selectedStructure),
      },
      ...directoryItems,
    ];
  }

  render() {
    const navigationItems = this.generateNavigationItems();
    const filesItems = this.generateDirectoryItems();

    const [firstFile, ...restOfFiles] = filesItems;
    const fileItemsWithNav = [
      firstFile,
      ...navigationItems,
      ...restOfFiles,
    ];

    return (
      <Layout.Menu
        items={[
          ...this.generateActionsItems(),
          ...fileItemsWithNav,
        ]}
      />
    );
  }
}

SideMenu.propTypes = {
  rootDirectory: PropTypes.shape({
    path: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})),
    type: PropTypes.string.isRequired,
  }).isRequired,
};
