test.run.runner = def(
  [
    test.run.test,
    require('path')
  ],

  function (test, path) {
    var run = function (reporter, reader, tests) {
      tests.forEach(function (testfile) {
        var testcase = path.resolve(testfile);
        global.test = test.create(reporter, reader, testcase);
        require(testcase);
        delete global.test;
      });
    };

    return {
      run: run
    };
  }
);
