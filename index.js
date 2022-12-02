/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import getFiles from './lib/get-files.js';
import getGroups from './lib/get-groups.js';
import handleGroups from './lib/handle-groups.js';

/**
 * @param {string} directory  Root directory in which images should be
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.skipExisting  Skip when the group directory already exists
 * @param {boolean} options.keepSuffix    Keep the original suffix, as default is to lowercase
 * @param {boolean} options.initChar Initial character in the filename needs to be a character
 *
 * @returns {void}
 */
export default (directory, options) => {
  const files = getFiles(directory, options),
    groups = getGroups(files);

  if (options.verbose) {
    console.log(`Moving under ${Object.keys(groups).length} groups`);
  }

  const countFiles = handleGroups(directory, groups, options);

  if (options.dryRun) {
    console.log(`Would have moved total of ${countFiles} files, but did not due to dry-run`);
  }
  else {
    console.log(`Moved total of ${countFiles} files`);
  }
};
