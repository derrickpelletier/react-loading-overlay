# Loading Overlay

[![npm version](https://badge.fury.io/js/react-loading-overlay.svg)](https://badge.fury.io/js/react-loading-overlay)

A customizable, simple loading overlay with transitions.

![](https://d2ffutrenqvap3.cloudfront.net/items/300t172h2B1g0w0W2W25/Screen%20Recording%202018-02-23%20at%2012.08%20AM.gif)

-------

## Usage

Wrap your components in it and toggle the `active` prop as necessary.

```javascript
import LoadingOverlay from '@tkforce/react-loading-overlay';

<LoadingOverlay
  active={isActive}
  spinner
  text='Loading your content...'
  >
  <p>Some content or children or something.</p>
</LoadingOverlay>
```


### props

+ **active**, `Boolean`, whether the loader is visible.
+ **animate**, `Boolean`, whether to fade the overlay in and out.
+ **spinner**, `Boolean`, whether to use a spinner in the loader.
+ **text**, `String`, used as content of the loader.
+ **background**, `String`, valid css color declaration for the overlay background.
+ **color**, `String`, valid css color declaration for the text and circle color.
+ **spinnerSize**, `String`, valid css size (`100px`) for the size of the spinner circle.
+ **zIndex**, `Integer`, use in case you are experiencing other z-indexed components appearing over top of the overlay.
+ **onClick**, `Function`, triggered when the overlay is clicked.

----

## Future
- Passing in custom loader components.
- Composable loader, maybe some alternative spinner options or something.
