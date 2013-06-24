test.run.runner = def(
  [
    test.run.accumulator,
    test.run.test,
    test.run.wrapper,
    ephox.bolt.module.config.builtins.commonjs,
    ephox.bolt.loader.transporter.commonjs.read,
    ephox.bolt.loader.api.commonjsevaller.load
  ],

  function (accumulator, test, wrapper, builtins, load, loadscript) {
    var run = function (reporter, reader, tests) {
      var runtest = test.create(builtins, load, loadscript, reporter, reader);

      var path = require('path');

      tests.forEach(function (testfile) {
        var testcase = path.resolve(testfile);
        accumulator.register(testfile, wrapper.sync, wrapper.async);
        require(testcase);
      });

      accumulator.drain(runtest, reporter.done);
    };

    return {
      run: run
    };
  }
);
