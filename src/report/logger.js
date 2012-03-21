test.report.logger = def(
  [
    test.report.errors,
    test.report.timer,
    test.report.namer
  ],

  function (errors, timer, namer) {
    var create = function (verbose) {
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

      var test = function (testcase, name) {
        var starttime = new Date();
        vlog('[' + name + ']');

        var pass = function () {
          ++passed;
          vlog('+ [passed] in ' + timer.elapsed(starttime))
        };

        var fail = function (error) {
          ++failed;
          log('- [failed] : ' + namer.format(testcase, name) + '');
          log('    ' + errors.clean(error).replace(/\n/g, '\n    '));
          log();
        };

        return {
          pass: pass,
          fail: fail
        };
      };

      var done = function () {
        log('Ran ' + (passed + failed) + ' tests in ' + timer.elapsed(initial) + ', ' + passed + ' passed, ' + failed + ' failed.');
        process.exit(failed === 0 ? 0 : 1);
      };

      return {
        test: test,
        done: done
      };
    };

    return {
      create: create
    }
  }
);
