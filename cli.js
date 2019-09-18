#! /usr/bin/env node
const commandLineArgs = require('command-line-args')
const initServer = require('./server/index.js');

const helpMsg = `
Welcome to the seedbox-downloader

To start using this CLI tool, you must provide a command, here is a list of valid commands:

  $ seedbox-downloader start

    options :
    -p : port number
    -d : seedbox directory path
    -a : htpasswd file path (optional)
    --dev : dev mode (optional)
`;
const OPTIONS_KEYS = {
  hostingPort: 'hostingPort',
  configuredDownloadFolder: 'configuredDownloadFolder',
  htpasswd: 'htpasswd',
  dev: 'dev',
  help: 'help',
};
const optionsDefinitions = [
  { name: 'command' },
  { name: OPTIONS_KEYS.dev, type: Boolean },
  { name: OPTIONS_KEYS.hostingPort, type: Number, alias: 'p' },
  { name: OPTIONS_KEYS.configuredDownloadFolder, type: String, alias: 'd' },
  { name: OPTIONS_KEYS.htpasswd, type: String, alias: 'a' },
  { name: OPTIONS_KEYS.help, type: Boolean, alias: 'h' },
];

try {
  const options = commandLineArgs(optionsDefinitions, { partial: true });
  const command = options._unknown ? options._unknown[0] : ''

  main({
    command,
    options,
  });
} catch (e) {
  console.log(helpMsg);
}

function main({
  command,
  options: { hostingPort, configuredDownloadFolder, htpasswd, help, dev },
}) {
  if (!hostingPort || !configuredDownloadFolder) {
    console.log(helpMsg)
    return
  }

  if (help) {
    console.log(helpMsg)
    return
  }

  if (command === 'start') {
    initServer(dev, {
      htpasswd,
      configuredDownloadFolder,
      hostingPort,
    })
    return
  }
}
