/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import path from 'node:path';

import tape from 'tape';
import getFiles from '../../lib/get-files.js';

tape('getFiles with all options set to false as are defaults', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: false,
    initChar: false
  };

  const result = getFiles(path.join('tests', 'fixtures'), options);

  test.equal(result.length, 9);
});

tape('getFiles with only files not starting with a number', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: false,
    initChar: true
  };

  const result = getFiles(path.join('tests', 'fixtures'), options);

  test.equal(result.length, 8);
});
