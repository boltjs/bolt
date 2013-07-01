define(
  'bolt.test.report.ConsoleReporter',

  [
    'bolt.test.report.Errors',
    'bolt.test.report.Timer',
    'bolt.test.report.Namer'
  ],

  function (Errors, Timer, Namer) {
    return function (verbose) {
      var initial = new Date();
      var times = {};
      var passed = 0;
      var failed = 0;
      var starttime = 0;

      var log = console.log;

      var vlog = function () {
        if (verbose)
          log.apply(null, arguments);
      };

      var summary = function (total) {
        vlog('== Running ' + total + ' test' + (total !== 1 ? 's' : '') + ' ==');
      };

      var test = function (testcase, name) {
        var starttime = new Date();
        vlog('[' + name + ']');

        var pass = function () {
          ++passed;
          vlog('+ [passed] in ' + Timer.elapsed(starttime))
        };

        var fail = function (error) {
          ++failed;
          log('- [failed] : ' + Namer.format(testcase, name) + '');
          log('    ' + Errors.clean(error).replace(/\n/g, '\n    '));
          log();
        };

        return {
          pass: pass,
          fail: fail
        };
      };

      var done = function () {
        log('Ran ' + (passed + failed) + ' tests in ' + Timer.elapsed(initial) + ', ' + passed + ' passed, ' + failed + ' failed.');
        process.exit(failed === 0 ? 0 : 1);
      };

      return {
        test: test,
        done: done
      };
    };
  }
);
