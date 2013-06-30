bolt.base.util.Path = def(
  [
  ],

  function () {
    var dirname = function (file) {
      var normalized = file.replace(/\\/g, '/');
      var end = normalized.lastIndexOf('/');
      return normalized.substring(0, end);
    };

    var basename = function (file) {
      var normalized = file.replace(/\\/g, '/');
      var end = normalized.lastIndexOf('/');
      return normalized.substring(end + 1);
    };

    var startsWith = function (str, prefix) {
      return str.indexOf(prefix) === 0;
    };

    var isAbsolute = function (path) {
      return startsWith(path, "//") ||
        startsWith(path, "http://") ||
        startsWith(path, "https://");
    };

    return {
      basename: basename,
      dirname: dirname,
      startsWith: startsWith,
      isAbsolute: isAbsolute
    };
  }
);
