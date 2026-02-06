'use strict';
/*jshint asi:true */

var test   =  require('tap').test
  , format =  require('util').format
  , anchor =  require('..')

function checkResult(t, mode, header, repetition, href) {
  var expectedAnchor = format('[%s](%s)', header, href)
  var resultText = 'generates ' + expectedAnchor + ' for header ' + header + ' and repetition = ' + repetition;
  t.equal(anchor(header, mode, repetition), expectedAnchor, resultText);
}

test('\ngenerating anchor in github mode', function (t) {

  var check = checkResult.bind(null, t, undefined);

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
  , [ 'What is the difference between `npm install` and `npm install --no-bin-links`?', null, '#what-is-the-difference-between-npm-install-and-npm-install---no-bin-links']
  , [ 'baz>quux?', null, '#bazquux']
  , [ 'do/while', null, '#dowhile']
  , [ ':)️', null, '#%EF%B8%8F']
  , [ '+ add', null, '#-add']
  , [ 'remove ~ something', null, '#remove--something']
  , [ '~ new ~', null, '#-new-']
  , [ '🎉 party time', null, '#-party-time']
  , [ '🤝 shake hands', null, '#-shake-hands']
  , [ '👩‍❤️‍👩 love ❤️', null, '#-love-']
  , [ '#ABC 🐱', null, '#abc-']
  , [ 'what_about_this?', null, '#what_about_this']
  , [ 'let`s_do_this', null, '#lets_do_this']
  , [ 'helloWorld', null, '#helloworld']
  , [ 'Name#Birthday', null, '#namebirthday']
  , [ 'x–y–z', null, '#xyz']
  , [ 'Modules 📦', null, '#modules-']
  , [ 'Modu📦les', null, '#modules']
  , [ 'Mo📦du📦les', null, '#modules']
  , [ '👷🏼‍♀️ Maintenance', null, '#-maintenance']
  , [ '🔴 or 🟡 - At Risk', null, '#-or----at-risk' ]
  , [ '🔄 Still Need Updates', null, '#-still-need-updates']
  , [ '⏱ Past-Due Items', null, '#-past-due-items']
  , [ '➡ ETA Changes This Week', null, '#-eta-changes-this-week']
  , [ '🚀 Shipped this week', null, '#-shipped-this-week']
  , [ '🎟 Support Tickets', null, '#-support-tickets']
  , [ '🔬 Team-by-team Breakdown: Hello', null, '#-team-by-team-breakdown-hello']
  , [ 'foo _bar_', null, '#foo-bar']
  , [ 'foo **baz**', null, '#foo-baz']
  , [ 'foo ~baf~', null, '#foo-baf']
  , [ 'bar_foo', null, '#bar_foo']
  , [ 'baz_foo_', null, '#baz_foo_']
  , [ '_foo_bax_', null, '#foo_bax']
  , [ '10% off', null, '#10-off']
  , [ '1/2 affected', null, '#12-affected']
  , [ '¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿Latin 1', null, '#%C2%AA%C2%B5%C2%BAlatin-1']

  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in ghost mode', function (t) {

  var check = checkResult.bind(null, t, 'ghost.org');

  [ [ 'intro', null,  '#intro' ]
  , [ 'intro', 0,  '#intro' ]
  , [ 'intro', 1,  '#intro-1' ]
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

  var check = checkResult.bind(null, t, 'nodejs.org');

  [ [ 'fs.rename(oldPath, newPath, [callback])', null, '#fs_rename_oldpath_newpath_callback' ]
  , [ 'fs.rename(oldPath, newPath, [callback])', 0, '#fs_rename_oldpath_newpath_callback' ]
  , [ 'fs.rename(oldPath, newPath, [callback])', 1, '#fs_rename_oldpath_newpath_callback_1' ]
  , [ 'fs.truncate(fd, len, [callback])', null, '#fs_truncate_fd_len_callback' ]
  , [ 'fs.symlink(srcpath, dstpath, [type], [callback])', null, '#fs_symlink_srcpath_dstpath_type_callback' ]
  , [ "fs.appendFile(filename, data, encoding='utf8', [callback])", null, '#fs_appendfile_filename_data_encoding_utf8_callback' ]
  , [ 'Class: fs.FSWatcher', null, '#class_fs_fswatcher' ]
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in nodejs.org mode for crypto module', function (t) {

  var check = checkResult.bind(null, t, 'nodejs.org');

  [ [ 'cipher.update(data, [input_encoding], [output_encoding])', null, '#cipher_update_data_input_encoding_output_encoding' ]
  , [ 'crypto.pbkdf2(password, salt, iterations, keylen, callback)', null, '#crypto_pbkdf2_password_salt_iterations_keylen_callback' ]
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})

test('\ngenerating anchor in bitbucket mode', function (t) {

  var check = checkResult.bind(null, t, 'bitbucket.org');

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

  var check = checkResult.bind(null, t, 'gitlab.com');

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

  var check = checkResult.bind(null, t, undefined);

  [ [ '标题', null, '#%E6%A0%87%E9%A2%98']
  , [ '标题', 0, '#%E6%A0%87%E9%A2%98' ]
  , [ '标题', 1, '#%E6%A0%87%E9%A2%98-1']
  , [ '中间有空格 和.符号.的(标题)', null, '#%E4%B8%AD%E9%97%B4%E6%9C%89%E7%A9%BA%E6%A0%BC-%E5%92%8C%E7%AC%A6%E5%8F%B7%E7%9A%84%E6%A0%87%E9%A2%98']
  , [ '存在，【中文】；《标点》、符号！的标题？', null, '#%E5%AD%98%E5%9C%A8%E4%B8%AD%E6%96%87%E6%A0%87%E7%82%B9%E7%AC%A6%E5%8F%B7%E7%9A%84%E6%A0%87%E9%A2%98']
  , [ 'Заголовок', null, '#%D0%B7%D0%B0%D0%B3%D0%BE%D0%BB%D0%BE%D0%B2%D0%BE%D0%BA']
  , [ 'NECHŤ JIŽ HŘÍŠNÉ SAXOFONY ĎÁBLŮ ROZZVUČÍ SÍŇ ÚDĚSNÝMI TÓNY WALTZU, TANGA A QUICKSTEPU.', null, '#nech%C5%A5-ji%C5%BE-h%C5%99%C3%AD%C5%A1n%C3%A9-saxofony-%C4%8F%C3%A1bl%C5%AF-rozzvu%C4%8D%C3%AD-s%C3%AD%C5%88-%C3%BAd%C4%9Bsn%C3%BDmi-t%C3%B3ny-waltzu-tanga-a-quickstepu']
  , [ 'PÓJDŹŻE, KIŃ TĘ CHMURNOŚĆ W GŁĄB FLASZY!', null, '#p%C3%B3jd%C5%BA%C5%BCe-ki%C5%84-t%C4%99-chmurno%C5%9B%C4%87-w-g%C5%82%C4%85b-flaszy']
  , [ 'FLYGANDE BÄCKASINER SÖKA STRAX HWILA PÅ MJUKA TUVOR.', null, '#flygande-b%C3%A4ckasiner-s%C3%B6ka-strax-hwila-p%C3%A5-mjuka-tuvor']
  , [ 'LYNX C.Q. VOS PRIKT BH: DAG ZWEMJUF! VICTOR JAGT ZWÖLF BOXKÄMPFER QUER ÜBER DEN GROßEN SYLTER DEICH.', null, '#lynx-cq-vos-prikt-bh-dag-zwemjuf-victor-jagt-zw%C3%B6lf-boxk%C3%A4mpfer-quer-%C3%BCber-den-gro%C3%9Fen-sylter-deich']
  , [ 'EL VELOZ MURCIÉLAGO HINDÚ COMÍA FELIZ CARDILLO Y KIWI. LA CIGÜEÑA TOCABA EL SAXOFÓN DETRÁS DEL PALENQUE DE PAJA.', null, '#el-veloz-murci%C3%A9lago-hind%C3%BA-com%C3%ADa-feliz-cardillo-y-kiwi-la-cig%C3%BCe%C3%B1a-tocaba-el-saxof%C3%B3n-detr%C3%A1s-del-palenque-de-paja']
  , [ 'DO BẠCH KIM RẤT QUÝ NÊN SẼ DÙNG ĐỂ LẮP VÔ XƯƠNG', null, '#do-b%E1%BA%A1ch-kim-r%E1%BA%A5t-qu%C3%BD-n%C3%AAn-s%E1%BA%BD-d%C3%B9ng-%C4%91%E1%BB%83-l%E1%BA%AFp-v%C3%B4-x%C6%B0%C6%A1ng']
  , [ 'ΞΕΣΚΕΠΆΖΩ ΤΗΝ ΨΥΧΟΦΘΌΡΑ ΒΔΕΛΥΓΜΊΑ', null, '#%CE%BE%CE%B5%CF%83%CE%BA%CE%B5%CF%80%CE%AC%CE%B6%CF%89-%CF%84%CE%B7%CE%BD-%CF%88%CF%85%CF%87%CE%BF%CF%86%CE%B8%CF%8C%CF%81%CE%B1-%CE%B2%CE%B4%CE%B5%CE%BB%CF%85%CE%B3%CE%BC%CE%AF%CE%B1']
  ].forEach(function (x) { check(x[0], x[1], x[2]) });
  t.end();
})
