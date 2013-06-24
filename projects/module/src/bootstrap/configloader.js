module.bootstrap.configloader = def(
  [
    module.util.locator,
    module.reader.browser,
    module.reader.direct
  ],

  function (locator, browser, direct) {
    var script = function (file) {
      var src = locator.locate();
      return function (done) {
        browser.read(src, file, done);
      };
    };

    var page = function (file) {
      return function (done) {
        browser.read('./', file, done);
      };
    };

    var empty = direct.create({});

    return {
      script: script,
      page: page,
      empty: empty
    };
  }
);
