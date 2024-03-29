#!/usr/bin/env node

/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'node:fs';
import path from 'node:path';

import optionator from 'optionator';

import foldarizer from '../index.js';

/* import pkg from '../package.json' assert { type: 'json' };*/
const packageFile = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

const optsParser = optionator({
  prepend: `${pkg.name} [options] <directory>`,
  append: `Version ${pkg.version}`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Help and usage instructions'
    },
    {
      option: 'version',
      alias: 'V',
      type: 'Boolean',
      description: 'Version number',
      example: '-V'
    },
    {
      option: 'verbose',
      alias: 'v',
      type: 'Boolean',
      description: 'Verbose output, will print which file is currently being processed'
    },
    {
      option: 'dry-run',
      alias: 'n',
      type: 'Boolean',
      description: 'Try it out without actually touching anything'
    },
    {
      option: 'skip-existing',
      alias: 'E',
      type: 'Boolean',
      description: 'Skip when the group directory already exists'
    },
    {
      option: 'keep-suffix',
      alias: 'k',
      type: 'Boolean',
      description: 'Keep the original suffix, as default is to lowercase'
    },
    {
      option: 'initial-character',
      alias: 'i',
      type: 'Boolean',
      description: 'Files are only processed if they start with a character, as oppose to a number'
    }
  ]
});

let opts;

try {
  opts = optsParser.parse(process.argv);
}
catch (error) {
  console.error(error.message);
  console.log(optsParser.generateHelp());
  process.exit(1);
}

if (opts.version) {
  console.log(pkg.version);
  process.exit(0);
}

if (opts.help) {
  console.log(optsParser.generateHelp());
  process.exit(0);
}

if (opts._.length !== 1) {
  console.error('Directory not specified');
  console.log(optsParser.generateHelp());
  process.exit(1);
}

const directory = path.resolve(opts._[0]);

try {
  fs.accessSync(directory);
}
catch (error) {
  console.error(`Directory "${directory}" does not exist`);
  console.error(error);
  process.exit(1);
}

// Fire away
foldarizer(directory, {
  verbose: typeof opts.verbose === 'boolean' ?
    opts.verbose :
    false,
  dryRun: typeof opts.dryRun === 'boolean' ?
    opts.dryRun :
    false,
  skipExisting: typeof opts.skipExisting === 'boolean' ?
    opts.skipExisting :
    false,
  keepSuffix: typeof opts.keepSuffix === 'boolean' ?
    opts.keepSuffix :
    false,
  initChar: typeof opts.initialCharacter === 'boolean' ?
    opts.initialCharacter :
    false
});
