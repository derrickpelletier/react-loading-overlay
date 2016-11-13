# Change Log

## [v0.2.2] - 2016-11-13

### Reverted breaking changes
- Reverted the pattern back to a wrapping component. Realized it's probably more cumbersome to require users to style their own wrapping containers properly. Will provide an alternate component to use as a child though.

## [v0.2.0] - 2016-11-12

### Breaking changes
- Restructured the use pattern. No longer works as a wrapper, instead, use as a child of the container component. Prevents generating extra markup and easier to drop in. (see [#2](https://github.com/derrickpelletier/react-loading-overlay/pull/2))
