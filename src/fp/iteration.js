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
    
    return {
      arrayeq: arrayeq,
      map: map
    };
  }
);