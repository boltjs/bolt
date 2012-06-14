module.util.pather = def(
  [
    module.util.path
  ],

  function (path) {
    var create = function (relativeto) {
      var base = path.dirname(relativeto);
      return function (path) {
        return base + '/' + path;
      };
    };

    return {
      create: create
    };
  }
);