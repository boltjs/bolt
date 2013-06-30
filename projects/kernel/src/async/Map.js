bolt.kernel.async.Map = def(
  [
    bolt.base.fp.Arr
  ],

  function (Arr) {
    var amap = function (data, f, oncomplete) {
      var total = data.length;
      var count = 0;
      var results = [];

      Arr.each(data, function (datum, i) {
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
