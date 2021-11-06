import type { DirectoryTree } from 'directory-tree';
import React, { useReducer } from 'react';
import type { Dispatch, ReactElement } from 'react';

interface Props {
  children: ReactElement
  slugNamePath: string[]
  tree: DirectoryTree
}

interface SeedboxState {
  directoryTree: DirectoryTree | null
  explorerPath: string[]
}

type Action =
  | { type: ActionTypes.SET_DIRECTORY_TREE, payload: DirectoryTree }
  | { type: ActionTypes.AFTER_FILE_DELETE, newTree: DirectoryTree }

export enum ActionTypes {
  SET_DIRECTORY_TREE = 'set_directory_tree',
  AFTER_FILE_DELETE = 'after_file_delete',
}

const initialState = {
  directoryTree: null,
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
    case ActionTypes.AFTER_FILE_DELETE:
      const { newTree } = action;

      return {
        ...state,
        directoryTree: newTree,
      };

    default:
      throw Error('unknown action dispatched');
  }
}

const SeedboxDownloaderProvider = ({ children, tree, slugNamePath }: Props): ReactElement => {
  const [state, dispatch] = useReducer(seedboxReducer, {
    directoryTree: tree,
    explorerPath: slugNamePath,
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
