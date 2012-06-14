module.bootstrap.configloader = def(
  [
    module.util.locator,
    module.reader.browser
  ],

  function (locator, browser) {
    var create = function (file) {
      var script = locator.locate();
      return function (done) {
        browser.read(script, file, done);
      };
    };

    return {
      create: create
    };
  }
);