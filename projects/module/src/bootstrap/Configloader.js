bolt.module.bootstrap.Configloader = def(
  [
    bolt.module.util.Locator,
    bolt.module.reader.Browser,
    bolt.module.reader.Direct
  ],

  function (Locator, Browser, Direct) {
    var script = function (file) {
      var src = Locator.locate();
      return function (done) {
        Browser.read(src, file, done);
      };
    };

    var page = function (file) {
      return function (done) {
        Browser.read('./', file, done);
      };
    };

    var empty = Direct.create({});

    return {
      script: script,
      page: page,
      empty: empty
    };
  }
);
