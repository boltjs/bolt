define(
  'bolt.test.run.BrowserRunner',

  [
    'bolt.test.run.Accumulator',
    'bolt.test.run.Test',
    'bolt.test.run.Wrapper'
  ],

  function (Accumulator, Test, Wrapper) {
    return function (config, tests, reporter) {
      var runtest = Test(bolt, reporter, config);

      var bomb = function (message) {
        throw 'Error loading test script: ' + message;
      };

      var loop = function () {
        if (tests.length > 0) {
          var testfile = tests.shift();
          Accumulator.register(testfile, Wrapper.sync, Wrapper.async);
          bolt.loadscript(testfile, loop, bomb);
        } else
          Accumulator.drain(runtest, reporter.done);
      };

      reporter.summary(tests.length);

      loop();
    };
  }
);
