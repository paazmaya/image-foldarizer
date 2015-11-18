# image-foldarizer

> Take a flat directory of named image files that have some counter and place then in subdirectories

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
```

After running `image-foldarizer images-and-media`, the structure will look like this:

```sh
images-and-media/
  Nanbudo-Kisahalli.2010-03-20/
    Nanbudo-Kisahalli.2010-03-20_33.mp4
    Nanbudo-Kisahalli.2010-03-20_34.mp4
    Nanbudo-Kisahalli.2010-03-20_36.mp4
    Nanbudo-Kisahalli.2010-03-20_38.mp4
```

File names themselves are not touched and files that do not match `/_\d+$/` for their basename
are not moved.

## Installation

```sh
[sudo] npm install --global image-foldarizer
```

## Command line options

```sh
image-foldarizer --help
```

## License

Licensed under [the MIT license](LICENSE).

Copyright (c) [Juga Paazmaya](http://paazmaya.fi) <paazmaya@yahoo.com>
