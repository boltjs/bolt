compiler.compile.source = def(
  [
    compiler.modulator.globalator
  ],

  function (globalator) {
    var build = function (modulators, sourcespecs, pather) {
      var specified = ar.map(sourcespecs, function (spec) {
        var modulator = modulators[spec.type];
        if (modulator === undefined)
          throw "Could not find modulator for type: " + spec.type;
        var args = [ pather ].concat(spec.args);
        return modulator.create.apply(null, args);
      });
      return specified.concat([ globalator.create() ]);
    };

    return {
      build: build
    };
  }
);
