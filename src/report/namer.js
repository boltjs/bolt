test.report.namer = def(
  [
    require('path')
  ],

  function (path) {
    var format = function (testcase, name) {
      var pretty = path.resolve(testcase).replace(process.cwd() + '/', ''); // FIX should just use path.relative once we can guarantee node 0.6+
      return pretty + '#' + name;
    };

    return {
      format: format
    };
  }
);
