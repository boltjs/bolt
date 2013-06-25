bolt.test.run.Runner = def(
  [
    bolt.test.run.Accumulator,
    bolt.test.run.Test,
    bolt.test.run.Wrapper,
    bolt.module.config.Builtins,
    bolt.loader.transporter.Commonjs,
    bolt.loader.api.CommonjsEvaller
  ],

  function (Accumulator, Test, Wrapper, Builtins, Commonjs, CommonjsEvaller) {
    var load = Commonjs.read;
    var loadscript = CommonjsEvaller.load;

    var run = function (reporter, reader, tests) {
      var runtest = Test.create(Builtins.commonjs, load, loadscript, reporter, reader);

      var path = require('path');

      tests.forEach(function (testfile) {
        var testcase = path.resolve(testfile);
        Accumulator.register(testfile, Wrapper.sync, Wrapper.async);
        require(testcase);
      });

      Accumulator.drain(runtest, reporter.done);
    };

    return {
      run: run
    };
  }
);
