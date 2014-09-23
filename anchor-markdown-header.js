'use strict';

// https://github.com/joyent/node/blob/192192a09e2d2e0d6bdd0934f602d2dbbf10ed06/tools/doc/html.js#L172-L183 
function getNodejsId(text, repetition) {
  text = text.replace(/[^a-z0-9]+/g, '_');
  text = text.replace(/^_+|_+$/, '');
  text = text.replace(/^([^a-z])/, '_$1');

  // If no repetition, or if the repetition is 0 then ignore. Otherwise append '_' and the number.
  // An example may be found here: http://nodejs.org/api/domain.html#domain_example_1
  if (repetition) {
    text += '_' + repetition;
  }

  return text;
}

function basicGithubId(text) {
  return text.replace(/ /g,'-')
    // escape codes
    .replace(/%([abcdef]|\d){2,2}/ig, '')
    // single chars that are removed
    .replace(/[\/?:\[\]`.,()*"';{}+<>]/g,'')
    ;
          
}

function getGithubId(text, repetition) {
  text = basicGithubId(text);

  // If no repetition, or if the repetition is 0 then ignore. Otherwise append '-' and the number.
  if (repetition) {
    text += '-' + repetition;
  }

  return text;
}

function getBitbucketId(text, repetition) {
  text = 'markdown-header-' + basicGithubId(text);

  // If no repetition, or if the repetition is 0 then ignore. Otherwise append '_' and the number.
  // https://groups.google.com/d/msg/bitbucket-users/XnEWbbzs5wU/Fat0UdIecZkJ
  if (repetition) {
    text += '_' + repetition;
  }

  return text;
}

//see https://github.com/gitlabhq/gitlabhq/blob/master/doc/markdown/markdown.md#header-ids-and-links
function getGitlabId(text, repetition) {
  var text = text.replace(/<(.*)>(.*)<\/\1>/g,"$2") //html tags
          .replace(/!\[.*\]\(.*\)/g,'') //image tags
          .replace(/\[(.*)\]\(.*\)/,"$1") //url
          .replace(/[^a-z0-9_-]/g,'-') //non alpha
          .replace(/[-]+/g,'-') //duplicated hyphen
          .replace(/^-/,'') //ltrim hyphen
          .replace(/-$/,''); //rtrim hyphen
  return text;
}


/**
 * Generates an anchor for the given header and mode.
 * 
 * @name anchorMarkdownHeader
 * @function
 * @param header      {String} The header to be anchored.
 * @param mode        {String} The anchor mode ('github.com'|'nodejs.org|bitbucket.org').
 * @param repetition  {Number} The nth occurrence of this header text, starting with 0. Not required for the 0th instance.
 * @param moduleName  {String} The name of the module of the given header (required only for 'nodejs.org' mode).
 * @return            {String} The header anchor that is compatible with the given mode.
 */
module.exports = function anchorMarkdownHeader(header, mode, repetition, moduleName) {
  mode = mode || 'github.com';
  var replace;

  switch(mode) {
    case 'github.com':
      replace = getGithubId;
      break;
    case 'bitbucket.org':
      replace = getBitbucketId;
      break;
    case 'gitlab.com':
      replace = getGitlabId;
      break;
    case 'nodejs.org':
      if (!moduleName) throw new Error('Need module name to generate proper anchor for ' + mode);
      replace = function (hd, repetition) {
          return getNodejsId(moduleName + '.' + hd, repetition);
      };
      break;
    default:
      throw new Error('Unknown mode: ' + mode);
  }

  var href = replace(header.trim().toLowerCase(), repetition);

  return '[' + header + '](#' + href + ')';
};
