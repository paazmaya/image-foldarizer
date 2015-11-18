/**
 * image-foldarizer
 * https://github.com/paazmaya/image-foldarizer
 *
 * Copyright (c) Juga Paazmaya <paazmaya@yahoo.com> (http://paazmaya.fi)
 * Licensed under the MIT license
 */

'use strict';

const fs = require('fs'),
	path = require('path');

const clj_fuzzy = require('clj-fuzzy');

/**
 * Read a directory, by returning all files with full filepath
 *
 * @param {string} directory  Directory
 * @param {object} options    {verbose: boolean}
 */
var getFiles = function _getFiles(directory, options) {
	if (options.verbose) {
		console.log(`Reading directory ${directory}`);
	}
	var images = [];

	var items = fs.readdirSync(directory)
		.map(function mapItems(item) {
			return path.join(directory, item);
		});

	items.forEach(function eachItems(item) {
		var stat = fs.statSync(item);
		if (stat.isFile()) {
			images.push(item);
		}
	});

	return images;
};

/**
 * @param {string} directory  Root directory
 * @param {object} options    Options {verbose: boolean, threshold: number}
 */
module.exports = function flatify(directory, options) {
	var files = getFiles(directory, options);

	var groups = {}; // keys are the future directory names
	// Now find something similar in the file names and create directories
	files.forEach(function eachFile(filepath) {
		var existing = Object.keys(groups);
		var base = path.parse(filepath);
		var suitable = existing.filter(function filterKeys(key) {
			return clj_fuzzy.metrics.dice(base.name, key) > options.threshold;
		});
		console.log(suitable);
		groups[base.name] = [filepath];
	});
};
