test.report.logger = def(
  [
    test.report.timer,
    test.report.namer
  ],

  function (timer, namer, util) {
    var create = function (verbose) {
      var util = require('util');
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
        log('    ' + errorstring(error).replace(/\n/g, '\n    '));
        log();
      };

      var errorstring = function (e) {
        if (typeof e === 'string')
          return e;
        if (e.name && e.name === 'AssertionError')
          return 'Assertion error' + (e.message ? ' [' + e.message + ']' : '') + ': [' + util.inspect(e.expected) + '] ' + e.operator + ' [' + util.inspect(e.actual) + ']' + stack(e);
        return util.inspect(e) + stack(e);
      };

      var stack = function (e) {
        if (!e.stack)
          return '';
        var lines = e.stack.split('\n').filter(function (line) {
          return line.indexOf('at') !== -1 &&
            !(line.indexOf('/kernel.js') !== -1 ||
              line.indexOf('/test.js') !== -1);
        });
        return '\n' + lines.join('\n');
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
      };
    };

    return {
      create: create
    }
  }
);
