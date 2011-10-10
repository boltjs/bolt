module.bootstrap.pather = def(
  [
    module.bootstrap.locator,
    module.bootstrap.path
  ],

  function (locator, path) {
    var dev = function (configfile) {
      var script = locator.locate();
      var base = path.dirname(script);
      var absolute = base + '/' + configfile;
      var configbase = path.dirname(absolute);
      return function (path) {
        return configbase + '/' + path;
      };
    };

    var compile = function () {
      var script = locator.locate();
      var base = path.dirname(script);
      return function (path) {
        return base + '/' + path;
      };
    };

    return {
      dev: dev,
      compile: compile
    };
  }
);