/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const fs = require('fs');

/**
 * Check if the destination directory exists and possibly has
 * files in it.
 *
 * @param {string} targetDir Target directory to be checked or created
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.lowercaseSuffix   Lowercase the resulting file suffix
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
    // Target directory exists, allow cancelling by user
    const subfiles = fs.readdirSync(targetDir);

    if (options.verbose) {
      console.log(`Target directory exists and is a directory which has files of total ${subfiles.length}`);
    }
    if (subfiles.length > 0) {
      return false;
    }

    return true;
  }

  return false;
};


module.exports = checkDestination;
