const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const untildify = require('untildify');

const configurationFieldNames = {
  hostingPort: 'hostingPort',
  configuredDownloadFolder: 'configuredDownloadFolder',
  htpasswd: 'htpasswd',
};

module.exports = async function config() {
  const configuration = await getConfiguration();

  console.log(`\nConfiguration sucessfully registered.\n`);

  return configuration;
};

async function getConfiguration() {
  const answers = await promptUserForConfiguration();

  return {
    ...answers,
  };
}

async function promptUserForConfiguration() {
  const { hostingPort, configuredDownloadFolder, htpasswd } = configurationFieldNames;

  const questions = [
    {
      type: 'number',
      name: hostingPort,
      message: 'Which port should be used to host the server ?',
      initial: 8080,
    },
    {
      type: 'text',
      name: configuredDownloadFolder,
      message: 'The directory where your files are stored ?',
      validate: answer => validateFolderAnswer(untildify(answer)),
      format: answer => path.resolve(untildify(answer)),
    },
    {
      type: 'text',
      name: htpasswd,
      message: 'Should the seedbox-downloader use an .htpasswd (if no, leave blank)',
      validate: answer => validatePasswdAnswer(untildify(answer)),
      format: (answer) => {
        if (!answer) {
          return false;
        }

        return path.resolve(untildify(answer));
      },
    },
  ];

  const answers = await prompts(questions, {
    // Gracefully exit process if user canceled prompts
    onCancel: () => process.exit(1),
  });

  return answers;
}

function validateFolderAnswer(folder) {
  try {
    fs.accessSync(folder, fs.constants.R_OK || fs.constants.W_OK);
  } catch (err) {
    return 'No such file or directory.';
  }

  if (!fs.lstatSync(folder).isDirectory()) {
    return 'You must specify a directory and not a file, my friend.';
  }

  return true;
}

function validatePasswdAnswer(htpasswdPath) {
  if (!htpasswdPath) {
    return true;
  }

  try {
    fs.accessSync(htpasswdPath, fs.constants.R_OK);
  } catch (err) {
    return 'No such file or directory.';
  }

  if (fs.lstatSync(htpasswdPath).isDirectory()) {
    return 'You must specify a file and not a directory.';
  }

  return true;
}
