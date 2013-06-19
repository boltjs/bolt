module.bootstrap.configloader = def(
  [
    module.util.locator,
    module.reader.browser,
    module.reader.direct
  ],

  function (locator, browser, direct) {
    var create = function (file) {
      var script = locator.locate();
      return function (done) {
        browser.read(script, file, done);
      };
    };

    var page = function (file) {
      return function (done) {
        browser.read('./', file, done);
      };
    };

    var empty = direct.create({});

    return {
      create: create,
      page: page,
      empty: empty
    };
  }
);
