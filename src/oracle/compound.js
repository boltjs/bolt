compiler.oracle.compound = def(
  [
  ],

  function () {
    var create = function (sources)  {
      return function (id) {
        for (var i = 0; i < sources.length; ++i)
          if (sources[i].can(id))
            return { found: sources[i] };
        return { notfound: true };
      };
    };
    
    return {
      create: create
    };
  }
);
