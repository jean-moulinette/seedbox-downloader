require('module-alias/register');

import commandLineArgs from 'command-line-args';
import startSeedbox from 'server/seedbox';

export interface CommandLineOptions {
  dev: boolean
  hostingPort: number
  configuredDownloadFolder: string
  htpasswd: string
  help: boolean
  _unknown: string[]
}

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

export function main(
  command: string,
  options: CommandLineOptions,
) {
  const {
    hostingPort,
    configuredDownloadFolder,
    help,
  } = options;

  if (!hostingPort || !configuredDownloadFolder) {
    console.log(helpMsg);
  } else if (help) {
    console.log(helpMsg);
  } else if (command === 'start') {
    // force trailing slash on download folder path
    const downloadFolderPath = configuredDownloadFolder[configuredDownloadFolder.length - 1] !== '/'
      ? `${configuredDownloadFolder}/`
      : configuredDownloadFolder;

    startSeedbox({
      ...options,
      configuredDownloadFolder: downloadFolderPath,
    });
  }
}

try {
  const options = commandLineArgs(optionsDefinitions, { partial: true }) as CommandLineOptions;
  // eslint-disable-next-line no-underscore-dangle
  const command = options._unknown ? options._unknown[0] : '';

  main(
    command,
    options,
  );
} catch (e) {
  console.log(helpMsg);
}
