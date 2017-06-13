/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const fs = require('fs'),
  path = require('path');

const tape = require('tape'),
  foldarizer = require('../index');

tape('a function with two parameters is exported', (test) => {
  test.plan(2);

  test.equal(typeof foldarizer, 'function', 'is a function');
  test.equal(foldarizer.length, 2, 'has two parameters');
});

tape('internal methods are functions', (test) => {
  test.plan(3);

  test.equal(typeof foldarizer._getGroups, 'function', 'is a function');
  test.equal(typeof foldarizer._checkDestination, 'function', 'is a function');
  test.equal(typeof foldarizer._handleGroups, 'function', 'is a function');
});

tape('getGroups gets groups of given list', (test) => {
  test.plan(1);

  const result = foldarizer._getGroups([
    'image_1.jpg',
    'image_2.jpg',
    'image_3.jpg',
    'image.jpg'
  ]);

  test.deepEqual(result, {
    image: [
      'image_1.jpg',
      'image_2.jpg',
      'image_3.jpg'
    ]
  });
});

tape('getGroups includes whatever types are given', (test) => {
  test.plan(1);

  const result = foldarizer._getGroups([
    'image_1.exe',
    'image_2.JPG',
    'image_3.gif',
    'image_4.png',
    'image.jpg'
  ]);

  test.deepEqual(result, {
    image: [
      'image_1.exe',
      'image_2.JPG',
      'image_3.gif',
      'image_4.png'
    ]
  });
});

tape('checkDestination does not create directory when dry-run', (test) => {
  test.plan(2);

  const options = {
    verbose: false,
    dryRun: true
  };
  const directory = path.join(__dirname, 'does-not-exist');

  const result = foldarizer._checkDestination(directory, options);
  test.ok(result);
  try {
    fs.accessSync(directory);
    test.fail('Directory was created');
  }
  catch (error) {
    test.pass('Directory not created');
  }
});

tape('checkDestination creates directory when does not exist', (test) => {
  test.plan(2);

  const options = {
    verbose: false,
    dryRun: false
  };
  const directory = path.join(__dirname, 'does-not-exist');

  const result = foldarizer._checkDestination(directory, options);
  test.ok(result);
  try {
    fs.accessSync(directory);
    test.pass('Directory was created');
    fs.rmdirSync(directory); // Clean up after.
  }
  catch (error) {
    test.fail('Directory not created');
  }
});

tape('checkDestination does not like when directory exists and is not empty', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: false
  };
  const directory = path.join(__dirname, 'fixtures');

  const result = foldarizer._checkDestination(directory, options);
  test.notOk(result);
});

tape('checkDestination does not like when destination is not directory', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: false
  };
  const directory = path.join(__dirname, 'index_test.js');

  const result = foldarizer._checkDestination(directory, options);
  test.notOk(result);
});
