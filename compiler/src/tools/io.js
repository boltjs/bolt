compiler.tools.io = def(
  [
    require('fs'),
    compiler.tools.error
  ],

  function (fs, error) {
    var lazyread = function (file) {
      var data;
      return function () {
        if (data === undefined)
          data = read(file);
        return data;
      };
    };

    var read = function (file) {
      if (!exists(file))
        error.die('File read error: expected file to exist, ' + file);
      return fs.readFileSync(file, 'UTF-8');
    };

    var readall = function (files) {
      return files.map(read);
    };

    var write = function (file, contents) {
      return fs.writeFileSync(file, contents);
    };

    var exists = function (file) {
      return fs.existsSync(file);
    };

    var rm = function (file) {
      fs.unlinkSync(file);
    };

    var saferm = function (file) {
      if (exists(file))
        rm(file);
    };

    return {
      lazyread: lazyread,
      read: read,
      readall: readall,
      write: write,
      exists: exists,
      rm: rm,
      saferm: saferm
    };
  }
);
