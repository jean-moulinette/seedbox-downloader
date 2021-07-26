import type { DirectoryTree } from 'directory-tree';
import React, { useReducer } from 'react';
import type { Dispatch, ReactElement } from 'react';

import {
  findRecursiveDirectory,
  updateExplorerPathAfterSelection,
} from './services';

interface Props {
  children: ReactElement
  tree: DirectoryTree
}

interface SeedboxState {
  directoryTree: DirectoryTree | null
  selectedDirectory: DirectoryTree | null
  explorerPath: DirectoryTree[]
}

type Action =
  | { type: ActionTypes.SET_DIRECTORY_TREE, payload: DirectoryTree }
  | { type: ActionTypes.SET_SELECTED_DIRECTORY, payload: DirectoryTree }
  | { type: ActionTypes.AFTER_FILE_DELETE, newTree: DirectoryTree }
  | { type: ActionTypes.SET_EXPLORER_PATH, explorerItem: DirectoryTree }
  | { type: ActionTypes.GO_TO_PARENT_DIRECTORY }

export enum ActionTypes {
  SET_DIRECTORY_TREE = 'set_directory_tree',
  SET_SELECTED_DIRECTORY = 'set_selected_tree',
  AFTER_FILE_DELETE = 'after_file_delete',
  SET_EXPLORER_PATH = 'set_explorer_path',
  GO_TO_PARENT_DIRECTORY = 'go_to_parent_directory',
}

const initialState = {
  directoryTree: null,
  selectedDirectory: null,
  explorerPath: [],
};

export const AppContext = React.createContext<{
  state: SeedboxState
  dispatch: Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
});

function seedboxReducer(state: SeedboxState, action: Action): SeedboxState {
  switch (action.type) {
    case ActionTypes.SET_DIRECTORY_TREE:
      return {
        ...state,
        directoryTree: action.payload
      };
    case ActionTypes.SET_SELECTED_DIRECTORY:
      return {
        ...state,
        selectedDirectory: action.payload,
        explorerPath: updateExplorerPathAfterSelection(
          action.payload,
          state.explorerPath
        ),
      };
    case ActionTypes.AFTER_FILE_DELETE:
      const { newTree } = action;
      const updatedSelectedDirectory = state.selectedDirectory
        ? findRecursiveDirectory(
          state.selectedDirectory.path,
          newTree,
        )
        : state.selectedDirectory;

      return {
        ...state,
        directoryTree: newTree,
        selectedDirectory: updatedSelectedDirectory,
      };
    case ActionTypes.SET_EXPLORER_PATH:
      const { explorerItem } = action;
      const selectedItemIndex = state.explorerPath.findIndex((item) => item.path === explorerItem.path);

      return {
        ...state,
        selectedDirectory: explorerItem,
        explorerPath: state.explorerPath.slice(0, selectedItemIndex + 1),
      };
    case ActionTypes.GO_TO_PARENT_DIRECTORY:
      const explorerPathCopy = [...state.explorerPath];
      explorerPathCopy.pop();
      const selectedDirectory = explorerPathCopy[explorerPathCopy.length - 1];

      return {
        ...state,
        selectedDirectory,
        explorerPath: explorerPathCopy,
      };

    default:
      throw Error('unknown action dispatched');
  }
}

const SeedboxDownloaderProvider = ({ children, tree }: Props): ReactElement => {
  const [state, dispatch] = useReducer(seedboxReducer, {
    directoryTree: tree,
    selectedDirectory: tree,
    explorerPath: [tree],
  });

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      { children }
    </AppContext.Provider>
  );
};

export default SeedboxDownloaderProvider;
