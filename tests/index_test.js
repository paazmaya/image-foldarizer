/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import tape from 'tape';
import foldarizer from '../index.js';

tape('a function with two parameters is exported', (test) => {
  test.plan(2);

  test.equal(typeof foldarizer, 'function', 'is a function');
  test.equal(foldarizer.length, 2, 'has two parameters');
});
