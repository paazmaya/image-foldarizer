# Version history for image-foldarizer

This changelog covers the version history and possible upcoming changes.
It follows the guidance from https://keepachangelog.com/en/1.0.0/.

## Unreleased `v4.xx` (2021-02-)
- Need to migrate all but one test execution away from Travis CI due to free account limitations
- Now using GitHub Actions to execute tests with Node.js v14

## `v4.0.0` (2020-08-23)
- Now the resulting filename has lowercase suffix by default
- Removed the option for lower casing resulting file suffix, `-l` and `--lowercase-suffix`
- Added the option to keep the original suffix via `-k` or `--keep-suffix`
- Run tests also against Node.js version 14. Now versions 10 (Travis), 12 (AppVeyor), and 14 (Travis) of Node.js are covered
- Test code smells (and few other things) at [Sonarcloud.io](https://sonarcloud.io/dashboard?id=paazmaya_image-foldarizer)

## `v3.0.0` (2020-02-02)
- Minimum Node.js version lifted from `8.11.1` to `10.13.0`
- Now always printing the total number of files touched, verbose or not

## `v2.0.1` (2019-05-13)
- `npm-shrinkwrap.json` was not under version control

## `v2.0.0` (2018-11-26)
- Allow group folder to exists #18 and avoid overwriting existing files. Use `--skip-existing` command line option to use the earlier behaviour.
- Use [`npm-shrinkwrap.json`](https://docs.npmjs.com/files/shrinkwrap.json) for locking the working set of 3rd party dependencies

## `v1.0.0` (2018-11-09)
- Minimum Node.js LTS version requirement increased from `6.9.5` to `8.11.1`
- Managed to get code coverage of unit testing over 99%, meaning ready to say this is first full release

## `v0.7.0` (2018-02-06)
- Tested against Node.js v8
- Dependencies updated
- Much more unit test coverage #1

## `v0.6.0` (2017-05-01)
- Print the number of possibly affected files, also when dry-run #8
- Minimum Node.js LTS version requirement increased from `4.2.0` to `6.9.5`

## `v0.5.1` (2016-08-09)
- Move code coverage from `instanbul` to `nyc`
- Test also in Windows, at [AppVeyor](https://ci.appveyor.com/project/paazmaya/image-foldarizer)
- Testing command line interface

## `v0.5.0` (2016-05-13)
- Show a total number of renamed/moved files at the end of processing #5
- Option to lowercase the resulting file extension, defaults to keep as is #6

## `v0.4.0` (2016-05-07)
- Using shared ESLint configuration #3
- Show relative path instead of absolute path when verbose #4

## `v0.3.0` (2016-02-10)
- Add option to process only files that start with a character

## `v0.2.0` (2016-02-10)
- Arrow functions everywhere
- Plenty of places where options were not passed forward

## `v0.1.0` (2015-11-18)
- Gets the job simply done, hence first release
