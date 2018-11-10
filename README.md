# image-foldarizer

> Take a flat directory of named image files that have some counter and place then in subdirectories

[![Build Status](https://travis-ci.org/paazmaya/image-foldarizer.svg?branch=master)](https://travis-ci.org/paazmaya/image-foldarizer)
[![Windows build status](https://ci.appveyor.com/api/projects/status/d61hp15tmxnk6cfj/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/image-foldarizer/branch/master)
[![codecov](https://codecov.io/gh/paazmaya/image-foldarizer/branch/master/graph/badge.svg)](https://codecov.io/gh/paazmaya/image-foldarizer)
[![dependencies Status](https://david-dm.org/paazmaya/image-foldarizer/status.svg)](https://david-dm.org/paazmaya/image-foldarizer)
[![Report](https://inspecode.rocro.com/badges/github.com/paazmaya/image-foldarizer/report?token=uM03BxIH0V_5grwbgOdsfCjKi7nmD1bgXhdHQzuOQDI&branch=master)](https://inspecode.rocro.com/reports/github.com/paazmaya/image-foldarizer/branch/master/summary)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer?ref=badge_shield)

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `8.11.1`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

## Purpose

Renaming image files is already a pain to do, and once that has been done by looking at
the images and patch renaming to add meaningful names with counters in the end,
the last part (at least in my work flow) is to place those images in their own directories
for better organisation.

This tool will help in the last step, by looking at a single directory for media files that
have a counter at the end of the file name, organise them so that the base name of the file
without the counter will become the directory name in which the given set of images will be moved.

For example there would be a `images-and-media` directory with the following flat structure:

```sh
images-and-media/
  Nanbudo-Kisahalli.2010-03-20_33.mp4
  Nanbudo-Kisahalli.2010-03-20_34.mp4
  Nanbudo-Kisahalli.2010-03-20_36.mp4
  Nanbudo-Kisahalli.2010-03-20_38.mp4
  encode.log
```

After running `image-foldarizer images-and-media`, the structure will look like this:

```sh
images-and-media/
  Nanbudo-Kisahalli.2010-03-20/
    Nanbudo-Kisahalli.2010-03-20_33.mp4
    Nanbudo-Kisahalli.2010-03-20_34.mp4
    Nanbudo-Kisahalli.2010-03-20_36.mp4
    Nanbudo-Kisahalli.2010-03-20_38.mp4
  encode.log
```

File names themselves are not touched and files that do not match `/_\d+$/` for their basename
are not moved.

In case the target directory already exists AND has any files in it, the given group will be ignored.
**This might change in a future release.**

See also [`image-flatify`](https://github.com/paazmaya/image-flatify) for organising images with their creation date.

## Installation

```sh
[sudo] npm install --global image-foldarizer
```

## Command line options

```sh
image-foldarizer --help
```

```sh
image-foldarizer [options] <directory>

  -h, --help               Help and usage instructions
  -V, --version            Version number
  -v, --verbose            Verbose output, will print which file is currently being processed
  -n, --dry-run            Try it out without actually touching anything
  -l, --lowercase-suffix   Lowercase the resulting file suffixes, or use as is by default
  -i, --initial-character  Files are only processed if they start with a character, as oppose to a
                           number

Version 1.0.0
```

## Contributing

First thing to do is to file [an issue](https://github.com/paazmaya/image-foldarizer/issues).
Then possibly open a Pull Request for solving the given issue.
[ESLint](http://eslint.org/) is used for linting the code, please use it by doing:

```sh
npm install
npm run lint
```

Unit tests are written with [`tape`](https://github.com/substack/tape) and can be executed with `npm test`.
Code coverage is inspected with [`nyc`](https://github.com/istanbuljs/nyc) and
can be executed with `npm run coverage` after running `npm test`.
Please make sure it is over 90% at all times.

## Version history

  - Use [`npm-shrinkwrap.json`](https://docs.npmjs.com/files/shrinkwrap.json) for locking the working set of 3rd party dependencies
* `v1.0.0` (2018-11-09)
  - Minimum Node.js LTS version requirement increased from `6.9.5` to `8.11.1`
  - Managed to get code coverage of unit testing over 99%, meaning ready to say this is first full release
* `v0.7.0` (2018-02-06)
  - Tested against Node.js v8
  - Dependencies updated
  - Much more unit test coverage #1
* `v0.6.0` (2017-05-01)
  - Print the number of possibly affected files, also when dry-run #8
  - Minimum Node.js LTS version requirement increased from `4.2.0` to `6.9.5`
* `v0.5.1` (2016-08-09)
  - Move code coverage from `instanbul` to `nyc`
  - Test also in Windows, at [AppVeyor](https://ci.appveyor.com/project/paazmaya/image-foldarizer)
  - Testing command line interface
* `v0.5.0` (2016-05-13)
  - Show a total number of renamed/moved files at the end of processing #5
  - Option to lowercase the resulting file extension, defaults to keep as is #6
* `v0.4.0` (2016-05-07)
  - Using shared ESLint configuration #3
  - Show relative path instead of absolute path when verbose #4
* `v0.3.0` (2016-02-10)
  - Add option to process only files that start with a character
* `v0.2.0` (2016-02-10)
  - Arrow functions everywhere
  - Plenty of places where options were not passed forward
* `v0.1.0` (2015-11-18)
  - Gets the job simply done, hence first release

## License

Licensed under [the MIT license](LICENSE).

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer?ref=badge_large)
