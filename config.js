const util  = require('util');
const fs = require('fs');
const path = require('path');
const prompts = require('prompts');
const untildify = require('untildify');

const configurationFieldNames = {
  hostingPort: 'hostingPort',
  folderLocation: 'folderLocation',
};

module.exports = async function config() {
  const configuration = await getConfiguration();

  saveConfiguration(configuration);

  console.log(`\nConfiguration sucessfully registered.\n`);
}

async function getConfiguration() {
  const answers = await promptUserForConfiguration();

  return {
    ...answers
  };
}

async function promptUserForConfiguration() {
  const { hostingPort, folderLocation } = configurationFieldNames;

  const questions = [
    {
      type: 'number',
      name: hostingPort,
      message: 'Which port should be used to host the server ?',
      initial: 8080,
    },
    {
      type: 'text',
      name: folderLocation,
      message: 'The directory where your files are stored ?',
      validate: answer => validateFolderAnswer(untildify(answer)),
      format: answer => path.resolve(untildify(answer)),
    },
  ];

  return await prompts(questions, {
    // Gracefully exit process if user canceled prompts
    onCancel: () => process.exit(1)
  });
}

function validateFolderAnswer(folder) {
  try {
    fs.accessSync(folder, fs.constants.R_OK | fs.constants.W_OK)
  } catch (err) {
    return 'No such file or directory.';
  }

  if (!fs.lstatSync(folder).isDirectory()) {
    return 'You must specify a directory and not a file, my friend.';
  }

  return true;
}

async function saveConfiguration(configuration) {
  const writeFile = util.promisify(fs.writeFile);
  const settingsFileName = 'settings.json';

  await writeFile(
    settingsFileName,
    JSON.stringify(
      configuration,
      null,
      2,
    ),
  );
}
