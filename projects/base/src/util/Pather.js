define(
  'bolt.base.util.Pather',

  [
    'bolt.base.util.Path'
  ],

  function (Path) {
    return function (relativeto) {
      var base = Path.dirname(relativeto);
      return function (path) {
        return base + '/' + path;
      };
    };
  }
);
