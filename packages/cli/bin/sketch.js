#!/usr/bin/env node

const init = require('@36node/init');
const eslint = require('@36node/eslint');

const args = process.argv.slice(2);
const firstArg = args[0];

switch (firstArg) {
  case 'init':
    init();
    break;
  case 'eslint':
    eslint();
    break;
  default:
    console.log('无效命令');
}
