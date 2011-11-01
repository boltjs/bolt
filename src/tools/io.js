compiler.tools.io = def(
  [
    require('fs'),
    require('path'),
    compiler.tools.error
  ],

  function (fs, path, error) {
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
      return path.existsSync(file);
    };

    var rm = function (file) {
      fs.unlinkSync(file);
    };

    var saferm = function (file) {
      if (exists(file))
        rm(file);
    };

    return {
      rm: rm,
      saferm: saferm,
      read: read,
      readall: readall,
      write: write,
      exists: exists
    };
  }
);
