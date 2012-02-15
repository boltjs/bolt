test.report.logger = def(
  [
    test.report.timer,
    test.report.namer
  ],

  function (timer, namer) {
    var create = function (verbose) {
      var times = {};
      var passed = 0;
      var failed = 0;
      var starttime = 0;

      var log = console.log;

      var vlog = function () {
        if (verbose)
          log.apply(null, arguments);
      };

      var start = function (testcase, name) {
        if (starttime === 0)
          starttime = Date.now();
        times[testcase + ':' + name] = Date.now();
        vlog('[' + name + ']');
      };

      var pass = function (testcase, name) {
        ++passed;
        var elapsed = timer.elapsed(times[testcase + ':' + name]);
        vlog('+ [passed] in ' + elapsed)
      };

      var fail = function (testcase, name, error) {
        ++failed;
        log('- [failed] : ' + namer.format(testcase, name) + '');
        log('     ' + error.replace(/\n/g, '\n    '));
        log();
      };

      var done = function () {
        log('Ran ' + (passed + failed) + ' tests in ' + timer.elapsed(starttime) + ', ' + passed + ' passed, ' + failed + ' failed.');
        process.exit(failed === 0 ? 0 : 1);
      };

      return {
        start: start,
        pass: pass,
        fail: fail,
        done: done
      };                                           1
    };

    return {
      create: create
    }
  }
);
