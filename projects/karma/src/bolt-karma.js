  karma.loaded = function() {};

  var reporter = (function () {
    var summary = function (total) {
      karma.info({total: total})
    };

    var test = function (testcase, name) {
      var start = new Date().getTime();

      var pass = function () {
        var result = {
          id: testcase + "#" + name,
          description: testcase + "#" + name,
          suite: [testcase + "#" + name],
          success: true,
          skipped: 0,
          time: new Date().getTime() - start,
          log: []
        };
        karma.result(result);
      };

      var fail = function (error) {
        var result = {
          id: testcase + "#" + name,
          description: testcase + "#" + name,
          suite: [testcase + "#" + name],
          success: false,
          skipped: 0,
          time: new Date().getTime() - start,
          log: [errors.clean(error)]
        };
        karma.result(result);
      };

      return {
        pass: pass,
        fail: fail
      };
    };

    var done = function () {
      karma.complete({
        coverage: window.__coverage__
      });
      karma.start();
    };

    return {
      summary: summary,
      test: test,
      done: done
    };
  })();

  var tests = Object.keys(karma.files).filter(function (file) {
    return /Test\.js$/.test(file);
  });

  bolt.test.run('/base/config/bolt/test.js', tests, reporter);
})(__karma__);
