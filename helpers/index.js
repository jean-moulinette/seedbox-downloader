const fs = require('fs');
const path = require('path');

exports.getUserConfig = function getUserConfig() {
  const userSettingsPath = path.resolve('settings.json');
  let file;

  try {
    file = fs.readFileSync(userSettingsPath, { encoding: 'utf8'});
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      throw new Error('You must run "seedbox-downloader config" before starting it !').message;
    }

    throw err;
  }

  return JSON.parse(file);
}
