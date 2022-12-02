/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (https://paazmaya.fi)
 * Licensed under the MIT license
 */

import fs from 'fs';
import path from 'path';

const NOT_STARTING_NUMBER = /^\D/u;

/**
 * Read a directory, by returning all files with full filepath
 * that possibly match the limitation set by initChar option
 *
 * @param {string} directory  Directory
 * @param {object} options    Options that are all boolean values and false by default
 * @param {boolean} options.verbose Print out which file is being processed
 * @param {boolean} options.dryRun  Do not touch files, just show what would happen
 * @param {boolean} options.skipExisting  Skip when the group directory already exists
 * @param {boolean} options.initChar Initial character in the filename needs to be a character
 *
 * @returns {array} List of files
 */
const getFiles = (directory, options) => {
  if (options.verbose) {
    console.log(`Reading directory ${directory}`);
  }

  return fs.readdirSync(directory)
    .filter((item) => {
      return options.initChar ?
        item.match(NOT_STARTING_NUMBER) :
        true;
    })
    .map((item) => path.join(directory, item))
    .filter((item) => {
      const stat = fs.statSync(item);

      return stat.isFile();
    });
};

export default getFiles;
