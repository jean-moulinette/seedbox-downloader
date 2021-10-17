declare namespace NodeJS {
  interface Global {
    ACTIVE_USERS?: {
      [hash: string]: { name: string }
    }
  }
}

declare module 'filesize' {
  export default function fn(size: number): string;
};
