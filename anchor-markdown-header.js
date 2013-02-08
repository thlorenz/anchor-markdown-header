'use strict';

// https://github.com/joyent/node/blob/192192a09e2d2e0d6bdd0934f602d2dbbf10ed06/tools/doc/html.js#L172-L183 
function getNodejsId(text) {
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9]+/g, '_');
  text = text.replace(/^_+|_+$/, '');
  text = text.replace(/^([^a-z])/, '_$1');
  return text;
}

module.exports = function anchorMarkdownHeader(header, mode, moduleName) {
  mode = mode || 'github';
  var replace;

  switch(mode) {
    case 'github':
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
