define(
  'boltc.tools.Files',

  [
    'boltc.tools.Io'
  ],

  function (Io) {
    var filenames = function (relative, names) {
      return names.map(function (x) {
        return relative + '/' + x;
      });
    };

    var files = function (relative, names) {
      return Io.readall(filenames(relative, names));
    };

    return {
      filenames: filenames,
      files: files
    };
  }
);
