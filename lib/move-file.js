/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'node:fs';
import path from 'node:path';

import fileExists from './file-exists.js';

/**
 * Move the given file to the target directory, after checking if it already exists.
 *
 * @param {string} filepath  Root directory in which images should be
 * @param {string} targetDir  Root directory in which images should be
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.skipExisting  Skip when the group directory already exists
 * @param {boolean} options.keepSuffix   Keep the original suffix, as default is to lowercase
 * @param {boolean} options.initChar Initial character in the filename needs to be a character
 *
 * @returns {number} Number of files moved
 */
const moveFile = (filepath, targetDir, options) => {

  const namemeta = path.parse(filepath),
    ext = options.keepSuffix ?
      namemeta.ext :
      namemeta.ext.toLowerCase();
  let target = path.join(targetDir, namemeta.name + ext),
    suffixCounter = 1;
  while (fileExists(target)) {
    target = path.join(targetDir, `${namemeta.name}-${suffixCounter}${ext}`);
    ++suffixCounter;
  }

  if (!options.dryRun) {
    fs.renameSync(filepath, target);
  }

  return target;
};

export default moveFile;
