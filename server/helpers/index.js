const fs = require('fs');
const path = require('path');
const { StringDecoder } = require('string_decoder');

const decoder = new StringDecoder('utf8');

exports.getUserConfig = function getUserConfig() {
  const userSettingsPath = path.resolve('settings.json');
  let file;

  try {
    file = fs.readFileSync(userSettingsPath, { encoding: 'utf8' });
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      throw new Error('You must run "seedbox-downloader config" before starting it !').message;
    }

    throw err;
  }

  return JSON.parse(file);
};

exports.getHtmlIndexAsString = function getHtmlIndexAsString() {
  const htmlIndexPath = path.resolve('client/public/index.html');

  const file = fs.readFileSync(htmlIndexPath);

  return decoder.write(Buffer.from(file));
};
