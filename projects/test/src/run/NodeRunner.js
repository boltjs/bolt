define(
  'bolt.test.run.NodeRunner',

  [
    'bolt.test.run.Accumulator',
    'bolt.test.run.Test',
    'bolt.test.run.Wrapper'
  ],

  function (Accumulator, Test, Wrapper) {
    return function (config, tests, reporter) {
      var bolt = require('./bolt');
      var path = require('path');

      var run = Test(bolt, reporter, config);

      tests.forEach(function (testfile) {
        var testcase = path.resolve(testfile);
        Accumulator.register(testfile, Wrapper.sync, Wrapper.async);
        require(testcase);
      });

      Accumulator.drain(run, reporter.done);
    };
  }
);
