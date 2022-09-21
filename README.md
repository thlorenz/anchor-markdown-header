# anchor-markdown-header [![Node.js CI](https://github.com/thlorenz/anchor-markdown-header/actions/workflows/node.js.yml/badge.svg)](https://github.com/thlorenz/anchor-markdown-header/actions/workflows/node.js.yml)

Generates an anchor for a markdown header.

## Example

```js
var anchor = require('anchor-markdown-header');

anchor('"playerJoined" (player)'); 
// --> ["playerJoined" (player)](#playerjoined-player)

anchor('fs.rename(oldPath, newPath, [callback])', 'nodejs.org', 'fs') 
// --> [fs.rename(oldPath, newPath, [callback])](#fs_fs_rename_oldpath_newpath_callback)

// github.com mode is default
anchor('"playerJoined" (player)') === anchor('"playerJoined" (player)', 'github.com'); 
// --> true
```

## API

`anchor(header[, mode] [, moduleName] [, repetition)`

```js
/**
 * @name anchorMarkdownHeader
 * @function
 * @param header      {String} The header to be anchored.
 * @param mode        {String} The anchor mode (github.com|nodejs.org|bitbucket.org|ghost.org|gitlab.com).
 * @param repetition  {Number} The nth occurrence of this header text, starting with 0. Not required for the 0th instance.
 * @param moduleName  {String} The name of the module of the given header (required only for 'nodejs.org' mode).
 * @return            {String} The header anchor that is compatible with the given mode.
 */
```
