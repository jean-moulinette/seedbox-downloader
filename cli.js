#! /usr/bin/env node

const { exec } = require('child_process');

const commandLineArguments = process.argv.slice(2).join(' ');
const initProcess = exec(`npm run init-seedbox -- ${commandLineArguments}`);

initProcess.stdout.on('data', console.log);
initProcess.stderr.on('data', console.log);
