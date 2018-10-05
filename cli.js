#! /usr/bin/env node
const config = require('./config.js');
const initServer = require('./server/index.js');

main(process.argv[2]);

function main(command) {
  const noCommandMsg = `
    Welcome to the seedbox-downloader

    To start using this CLI tool, you must provide a command, here is a list of valid commands:

      - seedbox-downloader config
      Use this to configure how the seedbox-downloader should be configured.

      - seedbox-downloader start
      Once you have configured seedbox-downloader, you can run the server by running this command.
  `;

  switch (command) {
    case 'config':
      config()
        .catch((err) => console.log(err));
      break;

    case 'start':
      initServer()
        .catch((err) => console.log(err));
      break;

    case undefined:
      console.log(noCommandMsg);
      break

    default:
      console.error('Unknown command, only "config" and "start" are valid commands');
  }
}
