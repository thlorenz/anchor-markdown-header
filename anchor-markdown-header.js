'use strict';

module.exports = function anchorMarkdownHeader(header, mode) {
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
      replace = function (hd) {
          return hd.replace(/[\( .]/g, '_')
                   .replace(/[\)\[\],;]/g, '');
      };
      break;
  }

  var href = replace(header.trim().toLowerCase());

  return '[' + header + '](#' + href + ')';
};
