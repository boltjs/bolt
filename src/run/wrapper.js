test.runner.wrapper = def(
  [
  ],

  function () {
    var wrap = function (reporter, testcase, f) {
      return function (/* arguments */) {
        try {
          reporter.start(testcase);
          f.apply(null, arguments);
          reporter.pass(testcase);
        } catch (f) {
          reporter.fail(testcase, f);
        }
      };
    };

    return {
      wrap: wrap
    };
  }
);