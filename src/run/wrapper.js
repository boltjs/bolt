test.run.wrapper = def(
  [
  ],

  function () {
    var wrap = function (reporter, testcase, name, f, next) {
      global.define = ephox.bolt.module.api.define;
      global.require = ephox.bolt.module.api.require;
      global.demand = ephox.bolt.module.api.demand;


      return function (/* arguments */) {
        try {
          reporter.start(testcase, name);
          f.apply(null, arguments);
          reporter.pass(testcase, name);
        } catch (f) {
          reporter.fail(testcase, name, f);
        } finally {
          delete global.define;
          delete global.require;
          delete global.demand;
          next();
        }
      };
    };

    return {
      wrap: wrap
    };
  }
);
