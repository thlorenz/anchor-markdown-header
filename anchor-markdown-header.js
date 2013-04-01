'use strict';

// https://github.com/joyent/node/blob/192192a09e2d2e0d6bdd0934f602d2dbbf10ed06/tools/doc/html.js#L172-L183 
function getNodejsId(text) {
  text = text.replace(/[^a-z0-9]+/g, '_');
  text = text.replace(/^_+|_+$/, '');
  text = text.replace(/^([^a-z])/, '_$1');
  return text;
}

function getGithubId(text) {
  return text
    .replace(/ /g,'-')
    .replace(/[:\[\]`.,()*"]/g,'');
}

/**
 * Generates an anchor for the given header and mode.
 * 
 * @name anchorMarkdownHeader
 * @function
 * @param header      {String} The header to be anchored.
 * @param mode        {String} The anchor mode ('github.com'|'nodejs.org|bitbucket.org').
 * @param moduleName  {String} The name of the module of the given header (required only for 'nodejs.org' mode).
 * @return            {String} The header anchor that is compatible with the given mode.
  */
module.exports = function anchorMarkdownHeader(header, mode, moduleName) {
  mode = mode || 'github.com';
  var replace;

  switch(mode) {
    case 'github.com':
      replace = getGithubId;
      break;
    case 'bitbucket.org':
      replace = function (text) { 
        return 'markdown-header-' + getGithubId(text); 
      };
      break;
    case 'nodejs.org': 
      if (!moduleName) throw new Error('Need module name to generate proper anchor for ' + mode);
      replace = function (hd) {
          return getNodejsId(moduleName + '.' + hd);
      };
      break;
    default:
      throw new Error('Unknown mode: ' + mode);
  }

  var href = replace(header.trim().toLowerCase());

  return '[' + header + '](#' + href + ')';
};
