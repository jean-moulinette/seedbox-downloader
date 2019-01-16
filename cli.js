#! /usr/bin/env node
const config = require('./config.js');
const initServer = require('./server/index.js');

main(process.argv[2]);

async function main(command) {
  const noCommandMsg = `
    Welcome to the seedbox-downloader

    To start using this CLI tool, you must provide a command, here is a list of valid commands:

      - seedbox-downloader start
        Once you have configured seedbox-downloader, you can run the server by running this command.

      - seedbox-downloader start-dev
        for starting the project when in developing mode
  `;
  let userConfig;

  switch (command) {
    case 'start-dev':
      userConfig = await config();
      initServer(true, userConfig)
        .catch((err) => console.log(err));
      break;

    case 'start':
      userConfig = await config();
      initServer(false, userConfig)
        .catch((err) => console.log(err));
      break;

    case undefined:
      console.log(noCommandMsg);
      break;

    default:
      console.error('Unknown command, only "start" and "start-dev" are valid commands');
  }
}
