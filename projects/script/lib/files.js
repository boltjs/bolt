module.exports = (function () {
  var fs = require('fs');
  var path = require('path');

  var fail = function (code, message) {
    console.error(message);
    process.exit(code);
  };

  var exists = function (f) { return fs.existsSync(f); };

  var ls = function (f) { return fs.readdirSync(f); };

  var rm = function (f) { fs.unlinkSync(f); };

  var rmdir = function (f) { fs.rmdirSync(f); };

  var isFile = function (f) { return exists(f) && fs.statSync(f).isFile(); };

  var isDirectory = function (f) { return exists(f) && fs.statSync(f).isDirectory(); };

  var read = function (f) { return fs.readFileSync(f); };

  var write = function (f, content) { return fs.writeFileSync(f, content); };

  var clean = function (dir) {
    if (!exists(dir))
      fail(10, 'Dir does not exist [' + dir + '].');
    if (!isDirectory(dir))
      fail(20, 'Dir is not a directory [' + dir + '].');
    ls(dir).forEach(function (name) {
      var f = path.join(dir, name);
      if (isDirectory(f))
        clean(f);
      else if (isFile(f))
        rm(f);
      else
        fail(30, 'Not a file or directory? Maybe you should not delete this.');
    });
    rmdir(dir);
  };

  // nodejs doesn't have an mkdir -p equivalent
  var mkdirp = function (dir) {
    dir = path.resolve(dir);
    if (!fs.existsSync(dir)) {
      mkdirp(path.dirname(dir));
      fs.mkdirSync(dir);
    }
  };

  // walk a directory tree
  var walk = function (root, processor) {
    var files = fs.readdirSync(root);
    files.forEach(function (file) {
      var filepath = path.join(root, file);
      fs.statSync(filepath).isDirectory() ?
        walk(filepath, processor) : processor(filepath);
    });
  };

  return {
    exists: exists,
    ls: ls,
    rm: rm,
    rmdir: rmdir,
    isFile: isFile,
    isDirectory: isDirectory,
    read: read,
    write: write,
    clean: clean,
    mkdirp: mkdirp,
    walk: walk
  };
})();
