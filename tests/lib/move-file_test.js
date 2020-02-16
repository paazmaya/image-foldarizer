/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */



const path = require('path');

const tape = require('tape'),
  moveFile = require('../../lib/move-file');

tape('moveFile will notice when target file exists', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: true,
    lowercaseSuffix: true,
    initChar: false
  };
  const filepath = __filename;
  const targetDir = __dirname;

  const result = moveFile(filepath, targetDir, options);

  test.equal(path.basename(result), 'move-file_test-1.js');
});
