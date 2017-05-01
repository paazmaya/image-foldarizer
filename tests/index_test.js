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
  test.plan(4);

  test.equal(typeof foldarizer._getFiles, 'function', 'is a function');
  test.equal(typeof foldarizer._getGroups, 'function', 'is a function');
  test.equal(typeof foldarizer._checkDestination, 'function', 'is a function');
  test.equal(typeof foldarizer._handleGroups, 'function', 'is a function');
});

tape('getFiles with all options set to false as are defaults', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: false,
    initChar: false
  };

  const result = foldarizer._getFiles(path.join(__dirname, 'fixtures'), options);

  test.equal(result.length, 8);
});

tape('getFiles with only files not starting with a number', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: false,
    initChar: true
  };

  const result = foldarizer._getFiles(path.join(__dirname, 'fixtures'), options);

  test.equal(result.length, 7);
});

tape('getGroups ', (test) => {
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

/*
tape('checkDestination ', (test) => {
  test.plan(1);

  const options = {
    verbose: false,
    dryRun: true,
    initChar: true
  };

  const result = foldarizer._checkDestination(path.join(__dirname, 'fixtures'), options);

  test.ok(result);
});
*/
