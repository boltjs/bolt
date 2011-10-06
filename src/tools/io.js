compiler.core.entry = def(
  [
    require('fs'),
    require('path')
  ],

  function (fs, path) {
    var read = function (file) {
        return fs.readFileSync(file, 'UTF-8');
    };

    var readall = function (files) {
      return files.map(read);
    };

    var write = function (file, contents) {
      return fs.writeFileSync(file, contents);
    };

    var exists = function (file) {
      return path.exists(file);
    };

    return {
      read: read,
      readall: readall,
      write: write,
      exists: exists
    };
  }
);