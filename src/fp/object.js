kernel.fp.object = def(
  [
  ],

  function () {
    var map = function (o, f) {
      var r = {};
      for (var i in o)
        if (o.hasOwnProperty(i))
          r[i] = f(i, o[i]);
      return r;
    };

    var each = map;

    return {
      map: map,
      each: each
    };
  }
);
