import * as React from 'react';

import { Layout } from 'ui';
import { Consumer } from 'bootstrap/provider';

export default class FileExplorer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      structure: {},
      selectedItem: null,
    };
  }

  setSelectedItem(selectedItem) {
    const { state } = this;

    this.setState({
      ...state,
      selectedItem,
    });
  }

  deleteFile = () => {
    console.log(this.state);
  }

  generateDirectoryItems(rootDirectory) {
    const { selectedItem } = this.state;
    const { children } = rootDirectory;

    // Filter out items that are not directories
    // we want to diplay only directories the navigation menu
    const directoriesItems = children.filter(childrenItem => childrenItem.type === 'directory');
    const directoryItems = directoriesItems.map(directoryItem => ({
      label: directoryItem.name,
      icon: (
        <span />
      ),
      level: 1,
      separator: false,
      active: selectedItem !== null && selectedItem.path === directoryItem.path,
      onClick: () => this.setSelectedItem(directoryItem),
    }));

    return [
      {
        label: rootDirectory.name,
        icon: (
          <span />
        ),
        separator: true,
        level: 0,
        active: selectedItem !== null && selectedItem.path === rootDirectory.path,
        onClick: () => this.setSelectedItem(rootDirectory),
      },
      ...directoryItems,
    ];
  }

  generateActionsItems() {
    return [
      {
        label: 'Delete action',
        icon: (
          <span />
        ),
        separator: true,
        active: false,
        level: 0,
        onClick: this.deleteFile,
      },
    ];
  }

  render() {
    return (
      <Layout.MainContent>
        <Consumer>
          {({ directoryStructure }) => (
            <Layout.Menu
              items={[
                ...this.generateActionsItems(),
                ...this.generateDirectoryItems(directoryStructure),
              ]}
            />
          )}
        </Consumer>
      </Layout.MainContent>
    );
  }
}
