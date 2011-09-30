kernel.fp.iteration = def(
  [
  ],

  function () {
    var arrayeq = function (a1, a2) {
      if (a1.length !== a2.length)
        return false;
      for (var i = 0; i < a1.length; ++i)
        if (a1[i] !== a2[i])
          return false;
      return true;
    };

    var map = function (a, f) {
      var r = [];
      for (var i = 0; i < a.length; ++i)
        r.push(f(a[i]));
      return r;
    };
    
    var each = map;

    var oeach = function (o, f) {
      for (var i in o)
        if (o.hasOwnProperty(i))
          f.call(null, i, o[i]);
    };

    return {
      arrayeq: arrayeq,
      map: map,
      each: each,
      oeach: oeach
    };
  }
);