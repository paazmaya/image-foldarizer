/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import path from 'node:path';

import tape from 'tape';
import moveFile from '../../lib/move-file.js';

tape('moveFile will notice when target file exists', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: true,
    initChar: false
  };
  const filepath = 'move-file_test.js';
  const targetDir = 'tests/lib';

  const result = moveFile(filepath, targetDir, options);

  test.equal(path.basename(result), 'move-file_test-1.js');
});

tape('moveFile keeps file suffix uppercase', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: true,
    keepSuffix: true
  };
  const filepath = 'tests/fixtures/UPPERCASE.FILESUFFIX';
  const targetDir = 'tests';

  const result = moveFile(filepath, targetDir, options);

  test.equal(path.basename(result), 'UPPERCASE.FILESUFFIX');
});

tape('moveFile lowercases file suffix by default', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: true
  };
  const filepath = 'tests/fixtures/UPPERCASE.FILESUFFIX';
  const targetDir = 'tests';

  const result = moveFile(filepath, targetDir, options);

  test.equal(path.basename(result), 'UPPERCASE.filesuffix');
});
