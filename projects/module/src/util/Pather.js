bolt.module.util.Pather = def(
  [
    bolt.kernel.util.Path
  ],

  function (Path) {
    var create = function (relativeto) {
      var base = Path.dirname(relativeto);
      return function (path) {
        return base + '/' + path;
      };
    };

    return {
      create: create
    };
  }
);
