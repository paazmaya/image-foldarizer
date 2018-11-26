/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

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

tape('handleGroups would moves files when needed', (test) => {
  test.plan(1);

  const directory = __dirname;
  const groups = {
    'Lynx-in-a-Zoo': [
      'Lynx-in-a-Zoo_1.JPG',
      'Lynx-in-a-Zoo_2.jpg',
      'Lynx-in-a-Zoo_3.jpg'
    ]
  };
  const options = {
    lowercaseSuffix: true,
    verbose: true,
    dryRun: true
  };

  const result = handleGroups(directory, groups, options);

  test.equal(result, 3);
});

tape('handleGroups cannot really move non existing files', (test) => {
  test.plan(1);

  const directory = __dirname;
  const groups = {
    'Lynx-in-a-Zoo': [
      'Lynx-in-a-Zoo_1.JPG',
      'Lynx-in-a-Zoo_2.jpg',
      'Lynx-in-a-Zoo_3.jpg'
    ]
  };
  const options = {
    lowercaseSuffix: true,
    verbose: true,
    dryRun: false
  };

  try {
    handleGroups(directory, groups, options);
    test.fail('Did not throw');
  }
  catch (error) {
    test.pass('Threw an error');
  }
});

tape('handleGroups cannot find non existing target directory', (test) => {
  test.plan(1);

  const directory = 'not-anywhere-to-be-found';
  const groups = {
    'Lynx-in-a-Zoo': [
      'Lynx-in-a-Zoo_1.JPG',
      'Lynx-in-a-Zoo_2.jpg',
      'Lynx-in-a-Zoo_3.jpg'
    ]
  };
  const options = {
    lowercaseSuffix: true,
    verbose: true,
    dryRun: false
  };

  try {
    handleGroups(directory, groups, options);
    test.fail('Did not throw');
  }
  catch (error) {
    test.pass('Threw an error');
  }
});
