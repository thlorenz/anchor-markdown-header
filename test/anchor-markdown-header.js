'use strict';
/*jshint asi:true */

var test   =  require('tap').test
  , format =  require('util').format
  , anchor =  require('..')

function checkResult(t, mode, moduleName, header, repetition, href) {
  var expectedAnchor = format('[%s](%s)', header, href)
  var resultText = 'generates ' + expectedAnchor + ' for header ' + header + ' and repetition = ' + repetition; 
  t.equal(anchor(header, mode, repetition, moduleName), expectedAnchor, resultText);
}

test('\ngenerating anchor in github mode', function (t) {

  var check = checkResult.bind(null, t, undefined, undefined);

  [ [ 'intro', null,  '#intro' ]
  , [ 'intro', 0,  '#intro' ]
  , [ 'intro', 1,  '#intro-1' ]
  , [ 'mineflayer.windows.Window (base class)', null,  '#mineflayerwindowswindow-base-class']
  , [ 'window.findInventoryItem(itemType, metadata, [notFull])', null, '#windowfindinventoryitemitemtype-metadata-notfull' ]
  , [ 'furnace "updateSlot" (oldItem, newItem)', null, '#furnace-updateslot-olditem-newitem' ]
  , [ '"playerJoined" (player)', null, '#playerjoined-player' ]
  , [ 'proxyquire(request: String, stubs: Object)', null, '#proxyquirerequest-string-stubs-object' ],
  , [ 'create object (post /db/create)', null, '#create-object-post-dbcreate' ]
  , [ 'where is it?', null, '#where-is-it' ]
  , [ "'webdav' Upload Method for 'dput'", null, '#webdav-upload-method-for-dput' ]
  , [ 'remove ;;semi;colons', null, '#remove-semicolons' ],
  , [ 'remove {curly braces}{}', null, '#remove-curly-braces'],
  , [ 'remove ++++pluses+', null, '#remove-pluses']
  , [ 'remove escape codes %3Cstatic%E3 coreappupevents %E2%86%92 object', null, '#remove-escape-codes-static-coreappupevents--object']
  , [ 'remove lt and gt <static>mycall', null, '#remove-lt-and-gt-staticmycall']
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in nodejs.org mode for fs module', function (t) {

  var check = checkResult.bind(null, t, 'nodejs.org', 'fs');

  [ [ 'fs.rename(oldPath, newPath, [callback])', null, '#fs_fs_rename_oldpath_newpath_callback' ]
  , [ 'fs.rename(oldPath, newPath, [callback])', 0, '#fs_fs_rename_oldpath_newpath_callback' ]
  , [ 'fs.rename(oldPath, newPath, [callback])', 1, '#fs_fs_rename_oldpath_newpath_callback_1' ] 
  , [ 'fs.truncate(fd, len, [callback])', null, '#fs_fs_truncate_fd_len_callback' ]
  , [ 'fs.symlink(srcpath, dstpath, [type], [callback])', null, '#fs_fs_symlink_srcpath_dstpath_type_callback' ]
  , [ "fs.appendFile(filename, data, encoding='utf8', [callback])", null, '#fs_fs_appendfile_filename_data_encoding_utf8_callback' ]
  , [ 'Class: fs.FSWatcher', null, '#fs_class_fs_fswatcher' ]
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in nodejs.org mode for crypto module', function (t) {

  var check = checkResult.bind(null, t, 'nodejs.org', 'crypto');

  [ [ 'cipher.update(data, [input_encoding], [output_encoding])', null, '#crypto_cipher_update_data_input_encoding_output_encoding' ]
  , [ 'crypto.pbkdf2(password, salt, iterations, keylen, callback)', null, '#crypto_crypto_pbkdf2_password_salt_iterations_keylen_callback' ]
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in bitbucket mode', function (t) {

  var check = checkResult.bind(null, t, 'bitbucket.org', undefined);

  [ [ 'intro', null, '#markdown-header-intro' ]
  , [ 'intro', 0, '#markdown-header-intro' ]
  , [ 'intro', 1, '#markdown-header-intro_1' ]
  , [ 'mineflayer.windows.Window (base class)', null, '#markdown-header-mineflayerwindowswindow-base-class']
  , [ 'proxyquire(request: String, stubs: Object)', null, '#markdown-header-proxyquirerequest-string-stubs-object' ]
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

