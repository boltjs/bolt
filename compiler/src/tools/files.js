compiler.tools.files = def(
  [
    compiler.tools.io
  ],

  function (io) {
    var filenames = function (relative, names) {
      return names.map(function (x) {
        return relative + '/' + x;
      });
    };

    var files = function (relative, names) {
      return io.readall(filenames(relative, names));
    };

    return {
      filenames: filenames,
      files: files
    };
  }
);
