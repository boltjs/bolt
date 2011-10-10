module.bootstrap.configloader = def(
  [
    module.error.error,
    module.bootstrap.path,
    module.bootstrap.main,
    module.bootstrap.locator,
    ephox.bolt.loader.api.scripttag
  ],

  function (error, path, main, locator, scripttag) {
    var load = function (configfile) {
      var script = locator.locate();
      var base = path.dirname(script);
      var absolute = base + '/' + configfile;
      var noop = function () {};
      scripttag.load(absolute, noop, error.die);
    };

    return {
      load: load
    };
  }
);