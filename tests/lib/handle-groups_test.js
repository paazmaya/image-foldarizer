/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const path = require('path');

const tape = require('tape'),
  handleGroups = require('../../lib/handle-groups');

tape('handleGroups does nothing when groups is empty', (test) => {
  test.plan(1);

  const directory = __dirname;
  const groups = {};
  const options = {
    lowercaseSuffix: false,
    verbose: false,
    dryRun: false
  };

  const result = handleGroups(directory, groups, options);

  test.equal(result, 0);
});

tape('handleGroups increments when group is not existing and dry running', (test) => {
  test.plan(1);

  const directory = __dirname;
  const groups = {
    'does-not-exist': ['not-here.txt']
  };
  const options = {
    lowercaseSuffix: false,
    verbose: false,
    dryRun: true
  };

  const result = handleGroups(directory, groups, options);

  test.equal(result, 1);
});
