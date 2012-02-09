module.bootstrap.configloader = def(
  [
    module.util.locator,
    module.reader.bouncing
  ],

  function (locator, bouncing) {
    var create = function (file) {
      var script = locator.locate();
      return function (done) {
        bouncing.read(script, file, done);
      };
    };

    return {
      create: create
    };
  }
);