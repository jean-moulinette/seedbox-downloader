declare namespace NodeJS {
  interface Global {
    SEEDBOX_FILE_TREE?: import('directory-tree').DirectoryTree
    PASSWD?: string | null
    ACTIVE_USERS?: {
      [hash: string]: { name: string }
    }
    INITED?: boolean
  }
}

declare module 'filesize' {
  export default function fn(size: number): string;
};
