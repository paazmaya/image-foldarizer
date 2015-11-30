#!/usr/bin/env node

/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const fs = require('fs'),
  path = require('path');

const optionator = require('optionator');

const foldarizer = require('../index');

let pkg;

try {
  const packageJson = fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8');

  pkg = JSON.parse(packageJson);
}
catch (error) {
  console.error('Could not read/parse "package.json", quite strange...');
  console.error(error);
  process.exit(1);
}

const optsParser = optionator({
  prepend: `${pkg.name} [options]`,
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
  process.exit(1);
}

const directory = path.resolve(opts._[0]);

if (!fs.existsSync(directory)) {
  console.error(`Directory (${directory}) does not exist`);
  process.exit(1);
}

// Fire away
foldarizer(directory, {
  verbose: typeof opts.verbose === 'boolean' ? opts.verbose : false,
  dryRun: typeof opts.dryRun === 'boolean' ? opts.dryRun : false
});
