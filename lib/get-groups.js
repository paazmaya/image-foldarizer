/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import path from 'node:path';

const INDEX_NOT_FOUND = -1,
  UNDERSCORE_NUMBERS = /_\d+$/gu;

/**
 * Find candidates for grouping under directories
 *
 * @param {array} files     List of files found
 * @returns {object} Group of files with same name
 */
const getGroups = (files) => {
  // Keys are the future directory names
  const groups = {};

  // Now find something similar in the file names and create directories
  files.forEach((filepath) => {
    const base = path.parse(filepath),
      nocounter = base.name.replace(UNDERSCORE_NUMBERS, '');

    if (nocounter === base.name) {
      // Nothing was removed, hence file should be ignored
      return;
    }

    const existing = Object.keys(groups);

    if (existing.indexOf(nocounter) !== INDEX_NOT_FOUND) {
      // List exists, add to it and move to the next file
      groups[nocounter].push(filepath);
    }
    else {
      groups[nocounter] = [filepath];
    }
  });

  return groups;
};

export default getGroups;
