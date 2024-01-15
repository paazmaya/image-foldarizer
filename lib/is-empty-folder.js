/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'node:fs';

/**
 * Check if the given directory has files.
 *
 * @param {string} targetDir  Target directory to be checked for containing files
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.skipExisting  Skip when the group directory already exists
 * @returns {boolean} True when having files.
 */
const isEmptyFolder = (targetDir, options) => {
  const subfiles = fs.readdirSync(targetDir);

  if (options.verbose) {
    console.log(`Target directory (${targetDir}) exists and contains ${subfiles.length} files`);
  }

  return subfiles.length === 0;
};

export default isEmptyFolder;
