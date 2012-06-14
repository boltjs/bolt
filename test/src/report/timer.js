test.report.timer = def(
  [
  ],

  function () {
    var elapsed = function (since) {
      var end = new Date();
      var millis = end - since;
      var seconds = Math.floor(millis / 1000);
      var point = Math.floor(millis - (seconds * 1000) / 100);
      var printable = 
        point < 10 ? '00' + point :
              point < 100 ? '0' + point :
                            '' + point;
      return seconds + '.' + printable + 's';
    };

    return {
      elapsed: elapsed
    };
  }
);
