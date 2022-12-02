/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import path from 'path';

import checkDestination from './check-destination.js';
import moveFile from './move-file.js';

/**
 * Move files to subdirectories based on the group structure
 *
 * @param {string} directory  Root directory in which images should be
 * @param {array} groups      Groups of files found
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.skipExisting  Skip when the group directory already exists
 * @param {boolean} options.keepSuffix   Keep the original suffix, as default is to lowercase
 * @param {boolean} options.initChar Initial character in the filename needs to be a character
 *
 * @returns {number} Number of files moved
 */
const handleGroups = (directory, groups, options) => {
  const keys = Object.keys(groups);
  let countFiles = 0;

  keys.forEach((key) => {
    const targetDir = path.join(directory, key);

    if (checkDestination(targetDir, options)) {
      countFiles += groups[key].length;
      groups[key].forEach((filepath) => {

        const target = moveFile(filepath, targetDir, options);

        if (options.verbose) {
          const inPath = path.relative(directory, filepath),
            outPath = path.relative(directory, target);
          console.log(`Moving ${inPath} --> ${outPath}`);
        }
      });
    }
  });

  return countFiles;
};

export default handleGroups;
