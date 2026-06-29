'use strict';

const anchorName = require('../anchor-markdown-header');

function parse(header) {
  // Extended Markdown heading IDs: `Header text {#id}` or kramdown's `{:#id}` at end of line.
  // See https://www.markdownlang.com/extended/heading-ids.html
  var idMatch = header.match(/^(.*?)[ \t]*\{:?#([^\s}]+)\}[ \t]*$/);
  return idMatch ? {
      text: idMatch[1],
      href: idMatch[2]
    } : {
      text: header
    };
}

/**
 * Generates an anchor link for the given header and mode.
 *
 * @name anchorLink
 * @function
 * @param header      {String} The header to be anchored.
 * @param href        {String} The href to be used in the anchor.
 * @return            {String} The header anchor link that is compatible with the given mode.
 */
function anchorLink(header, href) {
  if(href === undefined){
    throw new Error('Missing href');
  }
  return '[' + header + '](#' + href + ')';
}

/**
 * Generates an anchor for the given header and mode.
 *
 * @name anchor
 * @function
 * @param header      {String} The header to be anchored.
 * @param mode        {String} The anchor mode (github.com|nodejs.org|bitbucket.org|ghost.org|gitlab.com).
 * @param repetition  {Number} The nth occurrence of this header text, starting with 0. Not required for the 0th instance.
 * @param href        {String} The href to be used in the anchor.
 * @return            {object} The header anchor link & name that is compatible with the given mode.
 */
function anchor(header, mode, repetition, href) {
  const parsed = parse(header);
  if (href === undefined && parsed.href) href = encodeURI(parsed.href);
  if (href === undefined && mode !== 'custom') href = anchorName(parsed.text, mode, repetition);
  return {
    link: anchorLink(parsed.text, href),
    name: href,
    text: parsed.text
  };
}

// TODO: convert to a proxy call of anchor in v1 bump
/**
 * Generates an anchor link for the given header and mode.
 *
 * @name anchorMarkdownHeader
 * @function
 * @param header      {String} The header to be anchored.
 * @param mode        {String} The anchor mode (github.com|nodejs.org|bitbucket.org|ghost.org|gitlab.com).
 * @param repetition  {Number} The nth occurrence of this header text, starting with 0. Not required for the 0th instance.
 * @param href        {String} The href to be used in the anchor.
 * @return            {String} The header anchor link that is compatible with the given mode.
 */
function anchorMarkdownHeader(header, mode, repetition, href) {
  const parsed = parse(header);
  if (href === undefined && parsed.href) href = encodeURI(parsed.href);
  if (href === undefined && mode !== 'custom') href = anchorName(parsed.text, mode, repetition);
  return anchorLink(parsed.text, href);
};

anchorMarkdownHeader.anchorLink = anchorLink;
anchorMarkdownHeader.anchor = anchor;

module.exports = anchorMarkdownHeader;
