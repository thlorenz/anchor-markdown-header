'use strict';
/*jshint asi:true */

var test   =  require('trap').test
  , format =  require('util').format
  , anchor =  require('..')



test('generating anchor in github mode', function (t) {

  function check(header, href) {
    var expectedAnchor = format('[%s](%s)', header, href)
    t.equal(anchor(header), expectedAnchor, format('generates "%s" for header "%s"', expectedAnchor, header));
  }
  
  [ [ 'intro',  '#intro' ]
  , [ 'mineflayer.windows.Window (base class)',  '#mineflayerwindowswindow-base-class']
  , [ 'window.findInventoryItem(itemType, metadata, [notFull])', '#windowfindinventoryitemitemtype-metadata-notfull' ]
  , [ 'furnace "updateSlot" (oldItem, newItem)', '#furnace-updateslot-olditem-newitem' ]
  ].forEach(function (x) { check(x[0], x[1]) });
  
});
