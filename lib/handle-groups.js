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

const checkDestination = require('./check-destination');

/**
 * Check if the given file exists.
 *
 * @param {string} filepath  Root directory in which images should be
 * @returns {boolean} True when file exists
 */
const fileExists = (filepath) => {
  try {
    fs.accessSync(filepath);

    return true;
  }
  catch (error) {
    return false;
  }
};

/**
 * Move the given file to the target directory, after checking if it already exists.
 *
 * @param {string} filepath  Root directory in which images should be
 * @param {string} targetDir  Root directory in which images should be
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.lowercaseSuffix   Lowercase the resulting file suffix
 * @param {boolean} options.initChar Initial character in the filename needs to be a character
 *
 * @returns {number} Number of files moved
 */
const move = (filepath, targetDir, options) => {

  const namemeta = path.parse(filepath),
    ext = options.lowercaseSuffix ?
      namemeta.ext.toLowerCase() :
      namemeta.ext;
  let target = path.join(targetDir, namemeta.name + ext),
    suffixCounter = 1;
  while (fileExists(target)) {
    target = path.join(targetDir, namemeta.name + '-' + suffixCounter + ext);
    ++suffixCounter;
  }

  if (!options.dryRun) {
    fs.renameSync(filepath, target);
  }

  return target;
};

/**
 * Move files to subdirectories based on the group structure
 *
 * @param {string} directory  Root directory in which images should be
 * @param {array} groups      Groups of files found
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.lowercaseSuffix   Lowercase the resulting file suffix
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

        const target = move(filepath, targetDir, options);

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

module.exports = handleGroups;
