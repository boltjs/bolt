kernel.async.map = def(
  [
    kernel.fp.array
  ],

  function (ar) {
    var amap = function (data, f, oncomplete) {
      var total = data.length;
      var count = 0;
      var results = [];

      ar.each(data, function (datum, i) {
        f(datum, function (result) {
          ++count;
          results[i] = result;
          if (count === total)
            oncomplete(results);
        });
      });
    };

    return {
      amap: amap
    };
  }
);
