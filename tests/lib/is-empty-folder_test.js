/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

const fs = require('fs');

const tape = require('tape'),
  isEmptyFolder = require('../../lib/is-empty-folder');

tape('isEmptyFolder knows when empty', (test) => {
  test.plan(1);

  const tempDir = 'just-temporary-for-checking-empty-' + Date.now();
  fs.mkdirSync(tempDir);

  const options = {
    verbose: false
  };

  const result = isEmptyFolder(tempDir, options);
  fs.rmdirSync(tempDir);

  test.ok(result);
});

tape('isEmptyFolder knows when not empty', (test) => {
  test.plan(1);

  const directory = 'tests';

  const options = {
    verbose: true
  };

  const result = isEmptyFolder(directory, options);

  test.notOk(result);
});
