module.bootstrap.path = def(
  [
  ],

  function () {
    var dirname = function (file) {
      var end = file.lastIndexOf('/');
      return file.substring(0, end);
    };

    return {
      dirname: dirname
    };
  }
);