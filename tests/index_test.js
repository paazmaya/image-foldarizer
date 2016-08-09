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
