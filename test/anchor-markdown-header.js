'use strict';
/*jshint asi:true */

var test   =  require('trap').test
  , format =  require('util').format
  , anchor =  require('..')

function checkResult(t, mode, moduleName, header, href) {
  var expectedAnchor = format('[%s](%s)', header, href)
  t.equal(anchor(header, mode, moduleName), expectedAnchor, format('generates "%s" for header "%s"', expectedAnchor, header));
}
  
test('generating anchor in github mode', function (t) {

  var check = checkResult.bind(null, t, undefined, undefined);

  [ [ 'intro',  '#intro' ]
  , [ 'mineflayer.windows.Window (base class)',  '#mineflayerwindowswindow-base-class']
  , [ 'window.findInventoryItem(itemType, metadata, [notFull])', '#windowfindinventoryitemitemtype-metadata-notfull' ]
  , [ 'furnace "updateSlot" (oldItem, newItem)', '#furnace-updateslot-olditem-newitem' ]
  , [ '"playerJoined" (player)', '#playerjoined-player' ]
  , [ 'proxyquire(request: String, stubs: Object)', '#proxyquirerequest-string-stubs-object' ]
  ].forEach(function (x) { check(x[0], x[1]) });
  
})

test('generating anchor in nodejs.org mode for fs module', function (t) {

  var check = checkResult.bind(null, t, 'nodejs.org', 'fs');

  [ [ 'fs.rename(oldPath, newPath, [callback])', '#fs_fs_rename_oldpath_newpath_callback' ] 
  , [ 'fs.truncate(fd, len, [callback])', '#fs_fs_truncate_fd_len_callback' ]
  , [ 'fs.symlink(srcpath, dstpath, [type], [callback])', '#fs_fs_symlink_srcpath_dstpath_type_callback' ]
  , [ "fs.appendFile(filename, data, encoding='utf8', [callback])", '#fs_fs_appendfile_filename_data_encoding_utf8_callback' ]
  , [ 'Class: fs.FSWatcher', '#fs_class_fs_fswatcher' ]
  ].forEach(function (x) { check(x[0], x[1]) });
  
})

test('generating anchor in nodejs.org mode for crypto module', function (t) {

  var check = checkResult.bind(null, t, 'nodejs.org', 'crypto');

  [ [ 'cipher.update(data, [input_encoding], [output_encoding])', '#crypto_cipher_update_data_input_encoding_output_encoding' ]
  , [ 'crypto.pbkdf2(password, salt, iterations, keylen, callback)' , '#crypto_crypto_pbkdf2_password_salt_iterations_keylen_callback' ]
  ].forEach(function (x) { check(x[0], x[1]) });
})
