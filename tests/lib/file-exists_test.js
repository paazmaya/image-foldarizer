/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

const tape = require('tape'),
  fileExists = require('../../lib/file-exists');

tape('fileExists not existing', (test) => {
  test.plan(1);

  const result = fileExists('not-existing-' + Date.now());

  test.notOk(result);
});

tape('fileExists is there', (test) => {
  test.plan(1);

  const result = fileExists(__filename);

  test.ok(result);
});
