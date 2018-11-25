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

module.exports = fileExists;
