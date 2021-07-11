declare namespace NodeJS {
  interface Global {
    passwdUsers: {
      name: string
      password: string
    }[]
  }
}

declare module 'filesize' {
  export default function fn(size: number): string;
};
