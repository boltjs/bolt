module.bootstrap.configloader = def(
  [
    module.error.error,
    module.util.path,
    module.util.locator,
    ephox.bolt.loader.api.scripttag
  ],

  function (error, path, locator, scripttag) {
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