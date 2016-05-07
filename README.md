# image-foldarizer

> Take a flat directory of named image files that have some counter and place then in subdirectories

[![Build Status](https://travis-ci.org/paazmaya/image-foldarizer.svg?branch=master)](https://travis-ci.org/paazmaya/image-foldarizer)
[![codecov](https://codecov.io/gh/paazmaya/image-foldarizer/branch/master/graph/badge.svg)](https://codecov.io/gh/paazmaya/image-foldarizer)

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `4.2.0`.

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
  -i, --initial-character  Files are only processed if they start with a character, as oppose to a number

Version 0.4.0
```

## Contributing

First thing to do is to file [an issue](https://github.com/paazmaya/image-foldarizer/issues).
Then possibly open a Pull Request for solving the given issue.
ESLint is used for linting the code, please use it by doing:

```sh
npm install
npm run lint
```

## Version history

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

Copyright (c) [Juga Paazmaya](http://paazmaya.fi) <paazmaya@yahoo.com>
