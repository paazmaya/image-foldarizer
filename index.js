/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const getFiles = require('./lib/get-files'),
  getGroups = require('./lib/get-groups'),
  handleGroups = require('./lib/handle-groups');

/**
 * @param {string} directory  Root directory in which images should be
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.skipExisting  Skip when the group directory already exists
 * @param {boolean} options.lowercaseSuffix   Lowercase the resulting file suffix
 * @param {boolean} options.initChar Initial character in the filename needs to be a character
 *
 * @returns {void}
 */
module.exports = (directory, options) => {
  const files = getFiles(directory, options),
    groups = getGroups(files);

  if (options.verbose) {
    console.log(`Moving under ${Object.keys(groups).length} groups`);
  }

  const countFiles = handleGroups(directory, groups, options);

  if (options.verbose) {
    if (options.dryRun) {
      console.log(`Would have moved total of ${countFiles} files, but did not due to dry-run`);
    }
    else {
      console.log(`Moved total of ${countFiles} files`);
    }
  }
};
