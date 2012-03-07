test.run.runner = def(
  [
    test.run.test
  ],

  function (test) {
    var run = function (reporter, reader, tests) {
      var path = require('path');
      var accumulated = [];

      var loop = function () {
        if (accumulated.length > 0)
          test.apply(null, accumulated.shift());
        else
          reporter.done();
      };

      tests.forEach(function (testfile) {
        global.test = function () {
          var arrayed = Array.prototype.slice.call(arguments, 0);
          var args = [ loop, reporter, reader, testfile ].concat(arrayed);
          accumulated.push(args);
        };

        var testcase = path.resolve(testfile);
        require(testcase);
      });

      loop();
    };

    return {
      run: run
    };
  }
);
