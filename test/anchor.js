'use strict';
/*jshint asi:true */

var test   =  require('tap').test;
const { anchor } =  require('../lib');

test('\nanchor constructed as expected', function (t) {
  var anchorDetails = anchor('Header');
  t.same(anchorDetails.link, '[Header](#header)', 'link is correct');
  t.same(anchorDetails.name, 'header', 'name is correct');
  t.end();
});
