compiler.config.source = def(
  [
    ephox.bolt.kernel.fp.array,
  ],

  function (ar) {
    var buildsource = function (modulators, sourcespecs, pather, globalator) {
      var specified = ar.map(sourcespecs, function (spec) {
        var modulator = modulators[spec.type];
        if (modulator === undefined)
          throw "Could not find modulator for type: " + spec.type;
        var args = [ pather ].concat(spec.args);
        return modulator.create.apply(null, args);
      });
      return specified.concat([ globalator.create() ]);
    };

    var build = function (modulators, sourcespecs, pather, globalator)  {
      var sources = buildsource(modulators, sourcespecs, pather, globalator);
      return function (id) {
        for (var i = 0; i < sources.length; ++i)
          if (sources[i].can(id))
            return { found: sources[i] };
        return { notfound: true };
      };
    };
    
    return {
      build: build
    };
  }
);
