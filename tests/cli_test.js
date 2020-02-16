/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */



const fs = require('fs'),
  path = require('path'),
  execFile = require('child_process').execFile;

const tape = require('tape');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

tape('cli should output version number', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-V'], null, (err, stdout) => {
    test.equals(stdout.trim(), pkg.version, 'Version is the same as in package.json');
  });

});

tape('cli should output help by default', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('image-foldarizer [options] <directory>') !== -1, 'Help appeared');
  });

});

tape('cli should output help when requested', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '--help'], null, (err, stdout) => {
    test.ok(stdout.trim().indexOf('image-foldarizer [options] <directory>') !== -1, 'Help appeared');
  });

});

tape('cli should complain when package.json is gone', (test) => {
  test.plan(1);

  const nameFrom = 'package.json',
    nameTo = '_package.json';

  fs.renameSync(nameFrom, nameTo);

  execFile('node', [pkg.bin, '-h'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Could not read') !== -1, 'Complaint seen');
    fs.renameSync(nameTo, nameFrom);
  });

});

tape('cli should complain when non existing option used', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-g'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Invalid option ') !== -1, 'Complaint seen');
  });

});

tape('cli should complain when directory does not exist', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, 'not-here'], null, (err, stdout, stderr) => {
    test.ok(stderr.trim().indexOf('Directory "') === 0, 'Complaint seen');
  });

});

tape('cli does not move files when dry-run', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-vln', path.join(__dirname, 'fixtures')], null, (err, stdout, stderr) => {
    test.ok(stdout.trim().indexOf('Would have moved total of ') !== -1);
  });

});

tape('cli moves nothing since nothing found', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-liE', path.join(__dirname, '..')], null, (err, stdout, stderr) => {
    test.equals(stdout.trim(), 'Moved total of 0 files');
  });

});

tape('cli does not move files when just dry-run', (test) => {
  test.plan(1);

  execFile('node', [pkg.bin, '-n', path.join(__dirname, 'fixtures')], null, (err, stdout, stderr) => {
    test.equals(stdout.trim(), 'Would have moved total of 4 files, but did not due to dry-run');
  });

});
