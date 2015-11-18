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

/**
 * Read a directory, by returning all files with full filepath
 *
 * @param {string} directory  Directory
 * @param {object} options    Options {verbose: boolean, dryRun: boolean}
 * @returns {array}
 */
var getFiles = function _getFiles (directory, options) {
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
 * Find candidates for grouping under directories
 *
 * @param {array} files     List of files found
 * @param {object} options  Options {verbose: boolean, dryRun: boolean}
 * @returns {object}
 */
var getGroups = function _getGroups (files, options) {

	var groups = {}; // keys are the future directory names

	// Now find something similar in the file names and create directories
	files.forEach(function eachFile(filepath) {
		var base = path.parse(filepath);
		var nocounter = base.name.replace(/_\d+$/g, '');
		if (nocounter === base.name) {
			// Nothing was removed, hence file should be ignored
			return;
		}

		var existing = Object.keys(groups);
		if (existing.indexOf(nocounter) !== -1) {
			// List exists, add to it and move to the next file
			groups[nocounter].push(filepath);
		}
		else {
			groups[nocounter] = [filepath];
		}

	});

	return groups;
};

/**
 * @param {string} directory  Root directory in which images should be
 * @param {object} options    Options {verbose: boolean, dryRun: boolean}
 */
module.exports = function foldarizer(directory, options) {
	var files = getFiles(directory, options);
	var groups = getGroups(files, options);

	var keys = Object.keys(groups);
	keys.forEach(function (key) {
		var targetDir = path.join(directory, key);

		if (fs.existsSync(targetDir)) {

			var stat = fs.statSync(targetDir);
			if (stat.isDirectory()) {
				// Target directory exists, allow cancelling by user
				var subfiles = fs.readdirSync(targetDir);
				if (options.verbose) {
					console.log('Target directory exists and is a directory which has files of total ' + subfiles.length);
				}
				if (subfiles.length > 0) {
					return;
				}
			}
			else {
				return;
			}
		}
		else if (!options.dryRun) {
			fs.mkdirSync(targetDir);
		}

		groups[key].forEach(function (filepath) {
			var basename = path.basename(filepath),
				target = path.join(targetDir, basename);
			if (options.verbose) {
				console.log(`Moving ${filepath} --> ${target}`);
			}
			if (!options.dryRun) {
				fs.renameSync(filepath, target);
			}
		});
	});
};
