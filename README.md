# image-foldarizer

> Take a flat directory of named image files that have some counter and place then in subdirectories

[![Windows build status](https://ci.appveyor.com/api/projects/status/d61hp15tmxnk6cfj/branch/master?svg=true)](https://ci.appveyor.com/project/paazmaya/image-foldarizer/branch/master)
[![Node.js v22 CI](https://github.com/paazmaya/image-foldarizer/actions/workflows/linting-and-unit-testing.yml/badge.svg)](https://github.com/paazmaya/image-foldarizer/actions/workflows/linting-and-unit-testing.yml)
[![codecov](https://codecov.io/gh/paazmaya/image-foldarizer/branch/master/graph/badge.svg)](https://codecov.io/gh/paazmaya/image-foldarizer)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer?ref=badge_shield)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=paazmaya_image-foldarizer&metric=code_smells)](https://sonarcloud.io/dashboard?id=paazmaya_image-foldarizer)

Please note that the minimum supported version of [Node.js](https://nodejs.org/en/) is `22.11.0`, which is [the active Long Term Support (LTS) version](https://github.com/nodejs/Release#release-schedule).

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
  -E, --skip-existing      Skip when the group directory already exists
  -k, --keep-suffix        Keep the original suffix, as default is to lowercase
  -i, --initial-character  Files are only processed if they start with a character, as oppose to a number

Version 5.0.1
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

[Changes happening across different versions and upcoming changes are tracked in the `CHANGELOG.md` file.](CHANGELOG.md)

## License

Licensed under [the MIT license](LICENSE).

Copyright (c) [Juga Paazmaya](https://paazmaya.fi) <paazmaya@yahoo.com>

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fpaazmaya%2Fimage-foldarizer?ref=badge_large)
