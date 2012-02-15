test.report.timer = def(
  [
  ],

  function () {
    var elapsed = function (since) {
      var end = Date.now();
      var millis = end - since;
      var seconds = Math.floor(millis / 1000);
      var point = Math.floor(millis - (seconds * 1000) / 100);
      return seconds + '.' + point + 's';
    };

    return {
      elapsed: elapsed
    };
  }
);
