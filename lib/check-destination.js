/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'fs';

import isEmptyFolder from './is-empty-folder.js';

/**
 * Check if the destination directory exists and possibly has
 * files in it.
 *
 * @param {string} targetDir Target directory to be checked or created
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.skipExisting  Skip when the group directory already exists
 * @param {boolean} options.keepSuffix   Keep the original suffix, as default is to lowercase
 * @param {boolean} options.initChar Initial character in the filename needs to be a character
 *
 * @returns {boolean} Go forward or not
 */
const checkDestination = (targetDir, options) => {
  let stat;

  try {
    stat = fs.statSync(targetDir);
  }
  catch (error) {
    if (!options.dryRun) {
      fs.mkdirSync(targetDir);
    }

    return true;
  }

  if (stat.isDirectory()) {
    if (options.skipExisting) {
      return isEmptyFolder(targetDir, options);
    }

    return true;
  }

  return false;
};


export default checkDestination;
