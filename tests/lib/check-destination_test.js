/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'node:fs';
import path from 'node:path';

import tape from 'tape';
import checkDestination from '../../lib/check-destination.js';

tape('checkDestination does not create directory when dry-run', (test) => {
  test.plan(2);

  const options = {
    verbose: false,
    skipExisting: true,
    dryRun: true
  };
  const directory = path.join('tests', '..', 'does-not-exist');

  const result = checkDestination(directory, options);
  test.ok(result);
  try {
    fs.accessSync(directory);
    test.fail('Directory was created');
  }
  catch {
    test.pass('Directory not created');
  }
});

tape('checkDestination creates directory when does not exist', (test) => {
  test.plan(2);

  const options = {
    verbose: true,
    skipExisting: true,
    dryRun: false
  };
  const directory = path.join('tests', '..', 'does-not-exist');

  const result = checkDestination(directory, options);
  test.ok(result);
  try {
    fs.accessSync(directory);
    test.pass('Directory was created');
    fs.rmdirSync(directory); // Clean up after.
  }
  catch {
    test.fail('Directory not created');
  }
});

tape('checkDestination does not like when directory exists and is not empty', (test) => {
  test.plan(1);

  const options = {
    verbose: true,
    skipExisting: true,
    dryRun: false
  };
  const directory = path.join('tests', 'fixtures');

  const result = checkDestination(directory, options);
  test.notOk(result);
});

tape('checkDestination likes when directory is empty', (test) => {
  test.plan(1);
  const directory = path.join('tests', 'temporary-empty-dir');
  fs.mkdirSync(directory);

  const options = {
    verbose: false,
    skipExisting: true,
    dryRun: false
  };

  const result = checkDestination(directory, options);
  test.ok(result);
  fs.rmdirSync(directory);
});

tape('checkDestination does not like when destination is not directory', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    skipExisting: true,
    dryRun: false
  };
  const directory = path.join('tests', 'index_test.js');

  const result = checkDestination(directory, options);
  test.notOk(result);
});

tape('checkDestination will accept files in destination if not skipping', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    skipExisting: false,
    dryRun: false
  };
  const directory = path.join('tests', '..');

  const result = checkDestination(directory, options);
  test.ok(result);
});
