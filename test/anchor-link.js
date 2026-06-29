'use strict';
/*jshint asi:true */

var test   =  require('tap').test;
const { anchorLink } =  require('../lib');

test('\nanchor link constructed as expected', function (t) {
  var link = anchorLink('Header', 'link');
  t.same(link, '[Header](#link)', 'link is correct');
  t.end();
});
