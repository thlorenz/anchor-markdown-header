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
  , [ 'remove exclamation point!', null, '#remove-exclamation-point']
  , [ 'remove = sign', null, '#remove--sign']
  , [ '`history [pgn | alg]`', null, '#history-pgn--alg']
  , [ 'preseve consecutive | = hyphens', null, '#preseve-consecutive---hyphens']
  , [ 'Demo #1: using the `-s` option', null, '#demo-1-using-the--s-option']
  , [ 'class~method', null, '#classmethod']
  , [ 'func($event)', null, '#funcevent']
  , [ 'trailing *', null, '#trailing-']
  , [ 'My Cool@Header', null, '#my-coolheader']
  , [ 'module-specific-variables-using-jsdoc-@module', null, '#module-specific-variables-using-jsdoc-module']
  , [ 'Jack & Jill', null, '#jack--jill']
  , [ 'replace – or —', null, '#replace--or-']
  , [ 'Modules 📦', null, '#modules-']
  , [ 'Modu📦les', null, '#modules']
  , [ 'Mo📦du📦les', null, '#modules']
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in ghost mode', function (t) {

  var check = checkResult.bind(null, t, 'ghost.org', undefined);

  [ [ 'intro', null,  '#intro' ]
  , [ 'intro', 0,  '#intro' ]
  , [ 'repetitions not supported', 1,  '#repetitionsnotsupported' ]
  , [ 'mineflayer.windows.Window (base class)', null,  '#mineflayerwindowswindowbaseclass']
  , [ 'window.findInventoryItem(itemType, metadata, [notFull])', null, '#windowfindinventoryitemitemtypemetadatanotfull' ]
  , [ 'furnace "updateSlot" (oldItem, newItem)', null, '#furnaceupdateslotolditemnewitem' ]
  , [ '"playerJoined" (player)', null, '#playerjoinedplayer' ]
  , [ 'proxyquire(request: String, stubs: Object)', null, '#proxyquirerequeststringstubsobject' ],
  , [ 'create object (post /db/create)', null, '#createobjectpostdbcreate' ]
  , [ 'where is it?', null, '#whereisit' ]
  , [ "'webdav' Upload Method for 'dput'", null, '#webdavuploadmethodfordput' ]
  , [ 'remove ;;semi;colons', null, '#removesemicolons' ],
  , [ 'remove {curly braces}{}', null, '#removecurlybraces'],
  , [ 'remove ++++pluses+', null, '#removepluses']
  , [ 'does not remove escape codes instead removes % as in %3Cstatic%E3 %86 %3Cstatic%E3 coreappupevents %E2%86%92 object', null, '#doesnotremoveescapecodesinsteadremovesasin3cstatice3863cstatice3coreappupeventse28692object']
  , [ 'remove lt and gt <static>mycall', null, '#removeltandgtstaticmycall']
  , [ 'remove special chars `!@#%^&*()-+=[{]}\\|;:\'\",<.>/?', null, '#removespecialchars']
  , [ 'replace $ with d and ~ with t', null, '#replacedwithdandtwitht']
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
  , [ 'class~method', null, '#markdown-header-classmethod']
  , [ 'func($event)', null, '#markdown-header-funcevent']
  , [ '`history [pgn | alg]`', null, '#markdown-header-history-pgn-alg']
  , [ 'condense consecutive | = hyphens', null, '#markdown-header-condense-consecutive-hyphens']
  , [ 'Demo #1: using the `-s` option', null, '#markdown-header-demo-1-using-the-s-option']
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in gitlab mode', function (t) {

  var check = checkResult.bind(null, t, 'gitlab.com', undefined);

  [ [ 'intro', null, '#intro']
  , [ 'intro', 0, '#intro']
  , [ 'intro', 1, '#intro-1']
  , [ 'foo.bar', null, '#foobar']
  , ['..Ab_c-d. e [anchor](url) ![alt text](url)..', null, '#ab_c-d-e-anchor']
  , [ '存在，【中文】；《标点》、符号！的标题？', null, '#%E5%AD%98%E5%9C%A8%E4%B8%AD%E6%96%87%E6%A0%87%E7%82%B9%E7%AC%A6%E5%8F%B7%E7%9A%84%E6%A0%87%E9%A2%98']
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor for non-english header', function (t) {

  var check = checkResult.bind(null, t, undefined, undefined);

  [ [ '标题', null, '#%E6%A0%87%E9%A2%98']
  , [ '标题', 0, '#%E6%A0%87%E9%A2%98' ]
  , [ '标题', 1, '#%E6%A0%87%E9%A2%98-1']
  , [ '中间有空格 和.符号.的(标题)', null, '#%E4%B8%AD%E9%97%B4%E6%9C%89%E7%A9%BA%E6%A0%BC-%E5%92%8C%E7%AC%A6%E5%8F%B7%E7%9A%84%E6%A0%87%E9%A2%98']
  , [ '存在，【中文】；《标点》、符号！的标题？', null, '#%E5%AD%98%E5%9C%A8%E4%B8%AD%E6%96%87%E6%A0%87%E7%82%B9%E7%AC%A6%E5%8F%B7%E7%9A%84%E6%A0%87%E9%A2%98']
  , [ 'Заголовок', null, '#%D0%97%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BE%D0%BA']
  , [ 'NECHŤ JIŽ HŘÍŠNÉ SAXOFONY ĎÁBLŮ ROZZVUČÍ SÍŇ ÚDĚSNÝMI TÓNY WALTZU, TANGA A QUICKSTEPU.', null, '#nech%C5%A4-ji%C5%BD-h%C5%98%C3%8D%C5%A0n%C3%89-saxofony-%C4%8E%C3%81bl%C5%AE-rozzvu%C4%8C%C3%8D-s%C3%8D%C5%87-%C3%9Ad%C4%9Asn%C3%9Dmi-t%C3%93ny-waltzu-tanga-a-quickstepu']
  , [ 'PÓJDŹŻE, KIŃ TĘ CHMURNOŚĆ W GŁĄB FLASZY!', null, '#p%C3%93jd%C5%B9%C5%BBe-ki%C5%83-t%C4%98-chmurno%C5%9A%C4%86-w-g%C5%81%C4%84b-flaszy']
  , [ 'FLYGANDE BÄCKASINER SÖKA STRAX HWILA PÅ MJUKA TUVOR.', null, '#flygande-b%C3%84ckasiner-s%C3%96ka-strax-hwila-p%C3%85-mjuka-tuvor']
  , [ 'LYNX C.Q. VOS PRIKT BH: DAG ZWEMJUF! VICTOR JAGT ZWÖLF BOXKÄMPFER QUER ÜBER DEN GROßEN SYLTER DEICH.', null, '#lynx-cq-vos-prikt-bh-dag-zwemjuf-victor-jagt-zw%C3%96lf-boxk%C3%84mpfer-quer-%C3%9Cber-den-gro%C3%9Fen-sylter-deich']
  , [ 'EL VELOZ MURCIÉLAGO HINDÚ COMÍA FELIZ CARDILLO Y KIWI. LA CIGÜEÑA TOCABA EL SAXOFÓN DETRÁS DEL PALENQUE DE PAJA.', null, '#el-veloz-murci%C3%89lago-hind%C3%9A-com%C3%8Da-feliz-cardillo-y-kiwi-la-cig%C3%9Ce%C3%91a-tocaba-el-saxof%C3%93n-detr%C3%81s-del-palenque-de-paja']
  , [ 'DO BẠCH KIM RẤT QUÝ NÊN SẼ DÙNG ĐỂ LẮP VÔ XƯƠNG', null, '#do-b%E1%BA%A0ch-kim-r%E1%BA%A4t-qu%C3%9D-n%C3%8An-s%E1%BA%BC-d%C3%99ng-%C4%90%E1%BB%82-l%E1%BA%AEp-v%C3%94-x%C6%AF%C6%A0ng']
  , [ 'ΞΕΣΚΕΠΆΖΩ ΤΗΝ ΨΥΧΟΦΘΌΡΑ ΒΔΕΛΥΓΜΊΑ', null, '#%CE%9E%CE%95%CE%A3%CE%9A%CE%95%CE%A0%CE%86%CE%96%CE%A9-%CE%A4%CE%97%CE%9D-%CE%A8%CE%A5%CE%A7%CE%9F%CE%A6%CE%98%CE%8C%CE%A1%CE%91-%CE%92%CE%94%CE%95%CE%9B%CE%A5%CE%93%CE%9C%CE%8A%CE%91']
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})
