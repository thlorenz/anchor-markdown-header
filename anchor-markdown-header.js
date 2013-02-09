'use strict';

// https://github.com/joyent/node/blob/192192a09e2d2e0d6bdd0934f602d2dbbf10ed06/tools/doc/html.js#L172-L183 
function getNodejsId(text) {
  text = text.replace(/[^a-z0-9]+/g, '_');
  text = text.replace(/^_+|_+$/, '');
  text = text.replace(/^([^a-z])/, '_$1');
  return text;
}

/**
* 
* @name exports
* @function
* @param header {String} The header to be anchored
* @param mode {String} The anchor mode ('github.com'|'nodejs.org')
* @param moduleName {String} The name of the module name of the given header (required only for 'nodejs.org' mode)
* @return {String} The anchor that is compatible with the given mode
*/
module.exports = function anchorMarkdownHeader(header, mode, moduleName) {
  mode = mode || 'github.com';
  var replace;

  switch(mode) {
    case 'github.com':
      replace = function (hd) {
          return hd.replace(/ /g,'-')
                   .replace(/[\[\]`.,()*"]/g,'');
        };
      break;
    case 'nodejs.org': 
      if (!moduleName) throw new Error('Need module name to generate proper anchor for ' + mode);
      replace = function (hd) {
          return getNodejsId(moduleName + '.' + hd);
      };
      break;
  }

  var href = replace(header.trim().toLowerCase());

  return '[' + header + '](#' + href + ')';
};
