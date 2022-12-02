/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import tape from 'tape';
import fileExists from '../../lib/file-exists.js';

tape('fileExists not existing', (test) => {
  test.plan(1);

  const result = fileExists('not-existing-' + Date.now());

  test.notOk(result);
});

tape('fileExists is there', (test) => {
  test.plan(1);

  const result = fileExists('package.json');

  test.ok(result);
});
