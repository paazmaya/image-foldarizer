/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  execFile
} from 'node:child_process';

import tape from 'tape';

/* import pkg from '../package.json' assert { type: 'json' };*/
const packageFile = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));

tape('cli should output version number', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name], '-V'], null, (err, stdout) => {
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli should output help by default', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name]], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('image-foldarizer [options] <directory>') !== -1, 'Help appeared');
  });

});

tape('cli should output help when requested', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name], '--help'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('image-foldarizer [options] <directory>') !== -1, 'Help appeared');
  });

});

tape('cli should complain when non existing option used', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name], '-g'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Invalid option ') !== -1, 'Complaint seen');
  });

});

tape('cli should complain when directory does not exist', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name], 'not-here'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Directory "') === 0, 'Complaint seen');
  });

});

tape('cli does not move files when dry-run', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name], '-vn', path.join('tests', 'fixtures')], null, (err, stdout, stderr) => {
    test.ok(stdout.trim().indexOf('Would have moved total of ') !== -1);
  });

});

tape('cli moves nothing since nothing found', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name], '-iE', path.join('tests', '..')], null, (err, stdout, stderr) => {
    test.equals(stdout.trim(), 'Moved total of 0 files');
  });

});

tape('cli does not move files when just dry-run', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin[pkg.name], '-n', path.join('tests', 'fixtures')], null, (err, stdout, stderr) => {
    test.equals(stdout.trim(), 'Would have moved total of 4 files, but did not due to dry-run');
  });

});
