/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */



const path = require('path');

const tape = require('tape'),
  getGroups = require('../../lib/get-groups');

tape('getGroups gets groups of given list', (test) => {
  test.plan(1);

  const result = getGroups([
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

  const result = getGroups([
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
