/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const tape = require('tape'),
  foldarizer = require('../index');

tape('a function with two parameters is exported', (test) => {
  test.plan(2);

  test.equal(typeof foldarizer, 'function', 'is a function');
  test.equal(foldarizer.length, 2, 'has two parameters');
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
