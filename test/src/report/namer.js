test.report.namer = def(
  [
  ],

  function () {
    var format = function (testcase, name) {
      var path = require('path');
      var pretty = path.relative(process.cwd(), testcase);
      return pretty + '#' + name;
    };

    return {
      format: format
    };
  }
);
