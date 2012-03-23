module.util.path = def(
  [
  ],

  function () {
    var dirname = function (file) {
      var end = file.lastIndexOf('/');
      return file.substring(0, end);
    };

    var basename = function (file) {
      var end = file.lastIndexOf('/');
      return file.substring(end + 1);
    };

    return {
      basename: basename,
      dirname: dirname
    };
  }
);
