test.report.vanilla = def(
  [
  ],

  function () {
    var state = {}; // name: [ result ]

    var start = function (testcase) {
    };

    var pass = function (testcase) {
      console.log('[' + testcase + ']: PASS');
    };

    var fail = function (testcase, error) {
      console.log('[' + testcase + ']: FAIL :' + error);
    };

    return {
      start: start,
      pass: pass,
      fail: fail
    };
  }
);