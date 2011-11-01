compiler.compile.source = def(
  [
    ephox.bolt.kernel.fp.array,
    compiler.modulator.globalator
  ],

  function (ar, globalator) {
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
